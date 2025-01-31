import db from "@/app/lib/data";
import { sql } from "kysely";

export async function getRandomTags(
  category: string | string[] = "",
  limit: number = 5
): Promise<string[]> {
  try {
    let query = db.selectFrom("gallery");

    if (category) {
      query = query.where("category", "=", category);
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

export async function getTotalCount(searchTerm: string, category: string) {
  let query = db.selectFrom("gallery").select(sql`count(*)`.as("total_count"));

  if (category) {
    query = query.where("category", "=", category);
  }

  if (searchTerm) {
    query = query.where(
      sql<boolean>`tsv_search @@ plainto_tsquery('english', ${searchTerm})`
    );
  }

  const queryResult = await query.executeTakeFirst();

  return queryResult?.total_count ?? 0;
}

export async function getSearchResults(
  searchTerm: string,
  page: number,
  limit: number,
  seed: number,
  category: string
): Promise<any> {
  console.log("Querying with seed:", seed);

  const offset = (page - 1) * limit;

  let query = db
    .selectFrom("gallery")
    .select(["id", "title", "category", "base64"]);

  if (category) {
    query = query.where("category", "=", category);
  }

  if (searchTerm) {
    query = query.where(
      sql<boolean>`tsv_search @@ plainto_tsquery('english', ${searchTerm})`
    );
  }

  if (!searchTerm || !category) {
    query = query.orderBy(sql`md5(concat(${seed}::text, id::text))`);
  }

  return await query.offset(offset).limit(limit).execute();
}
