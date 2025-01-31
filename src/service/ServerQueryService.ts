import db from "@/app/lib/data";
import { sql } from "kysely";

export async function getRandomTags(
  category: string | string[] = "",
  limit: number = 5,
): Promise<string[]> {

  try {

    let query = db.selectFrom("gallery");

    if (category) {

        query = query.where("category", "=", category);
    }

    const result = await query
        .select(db.fn("unnest", ["tags"])
        .as("random_tags"))
        .orderBy(sql`random()`)
        .limit(limit)
        .execute();

    console.log(result);

    if (!result) {
      
        throw new Error("No Suggestion Result");
    }

    return result.map(row => row.random_tags as string);
    
  } catch (error) {

    console.error(`Failed to gather filter tags: ${error}`);
    return [];
  }
}
