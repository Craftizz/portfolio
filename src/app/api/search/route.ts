import db from '@/app/lib/data';
import { sql } from 'kysely';
import { NextRequest } from 'next/server';

async function getRandomTags() {

    const limit = 10;

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

    return result[0]?.random_tags ?? [];
}

export async function GET(request: NextRequest) { 

    console.log("Requesting Tags...");

    const tags = await getRandomTags();
    
    return new Response(
        JSON.stringify({
          tags: tags,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
}