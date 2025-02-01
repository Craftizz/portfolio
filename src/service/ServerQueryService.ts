import db from "@/app/lib/data";
import { sql } from "kysely";

/**
 * A function to return a searchable tags
 * based on current filter
 * 
 * @param category category of random tags
 * @param limit number of results
 * @returns string[] of tags
 */
export async function getRandomTags(
  category: string | string[] = "",
  location: string,
  time: string[],
  frame: string[],
  limit: number = 5
): Promise<string[]> {
  try {
    let query = db.selectFrom("gallery");

    if (category) {
      query = query.where("category", "=", category);
    }

    if (location) {
      query = query.where("location", "=", location);
    }
  
    if (time && time.some(item => item.trim() !== "")) {
      query = query.where("time", "in", time);
    }
  
    if (frame && frame.some(item => item.trim() !== "")) {
      query = query.where("size", "in", frame);
    }

    const result = await query
      .select(db.fn("unnest", ["tags"]).as("random_tags"))
      .orderBy(sql`random()`)
      .limit(limit)
      .execute();

    if (!result) {
      throw new Error("No Suggestion Result");
    }

    return result.map((row) => row.random_tags as string);
    
  } catch (error) {
    console.error(`Failed to gather filter tags: ${error}`);
    return [];
  }
}

/**
 * A function to get a total count of a query
 * 
 * @param searchTerm the search of query
 * @param category the category of query
 * @returns a number of total results of the query
 */
export async function getTotalCount(
  searchTerm: string,
  category: string,
  location: string,
  time: string[],
  frame: string[]
) {
  let query = db.selectFrom("gallery").select(sql`count(*)`.as("total_count"));

  if (category) {
    query = query.where("category", "=", category);
  }

  if (location) {
    query = query.where("location", "=", location);
  }

  if (time && time.some(item => item.trim() !== "")) {
    query = query.where("time", "in", time);
  }

  if (frame && frame.some(item => item.trim() !== "")) {
    query = query.where("size", "in", frame);
  }

  if (searchTerm) {
    query = query.where(
      sql<boolean>`tsv_search @@ plainto_tsquery('english', ${searchTerm})`
    );
  }

  const queryResult = await query.executeTakeFirst();

  return queryResult?.total_count ?? 0;
}

/**
 * A function to get frames based 
 * on search, category page, and seed.
 * 
 * @param searchTerm the search for the query
 * @param category the category of the query
 * @param page the offset for the query
 * @param limit the number of results
 * @param seed random hex used for consistency
 * @returns frame with id, title, category and base64
 */
export async function getSearchResults(
  searchTerm: string,
  category: string,
  location: string,
  time: string[],
  frame: string[],
  page: number,
  limit: number,
  seed: number,
): Promise<any> {
  console.log("Querying with seed:", seed);

  const offset = (page - 1) * limit;

  let query = db
    .selectFrom("gallery")
    .select(["id", "title", "category", "base64"]);

  if (category) {
    query = query.where("category", "=", category);
  }

  if (location) {
    query = query.where("location", "=", location);
  }

  if (time && time.some(item => item.trim() !== "")) {
    query = query.where("time", "in", time);
  }

  if (frame && frame.some(item => item.trim() !== "")) {
    query = query.where("size", "in", frame);
  }

  if (searchTerm) {
    query = query.where(
      sql<boolean>`tsv_search @@ plainto_tsquery('english', ${searchTerm})`
    );
  }

  if (!searchTerm || !category) {
    query = query.orderBy(sql`md5(concat(${seed}::text, id::text))`);
  }

  return await query.offset(offset)
                    .limit(limit)
                    .execute();
}
