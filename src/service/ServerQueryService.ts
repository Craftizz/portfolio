import db from "@/app/lib/data";
import { sql } from "kysely";

export async function getRandomTags(toRequest : number): Promise<string[]> {
    try {

        const result = await db
        .selectFrom('gallery')
        .select([
            sql`ARRAY(
            SELECT unnest(tags)
            FROM gallery
            ORDER BY random()
            LIMIT ${toRequest}
            )`.as('random_tags')
        ])
        .execute();

        if (!result) {

            return[];
        }

        return result[0].random_tags as string[];

    } catch (error) {

        console.error(`Failed to gather filter tags: ${error}`);
        return [];
    }
}