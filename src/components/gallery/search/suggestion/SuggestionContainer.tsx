import db from "@/app/lib/data";
import { sql } from "kysely";
import SearchSuggestion from "./Suggestion";

export default async function SearchSuggestionContainer() {

    const tags: string[] = await getSuggestions();

    return <SearchSuggestion tags={tags} />;
}

async function getSuggestions(): Promise<string[]> {
    try {

        const limit = 15;

        const result = await db
        .selectFrom('gallery')
        .select([
            sql`ARRAY(
            SELECT unnest(tags)
            FROM gallery
            ORDER BY random()
            LIMIT ${limit}
            )`.as('random_tags')
        ])
        .execute();

        if (!result) {

            return[];
        }

        return result[0].random_tags as string[];

    } catch (error) {

        console.error(`Failed to gather search suggestions: ${error}`);
        return [];
    }
}
  