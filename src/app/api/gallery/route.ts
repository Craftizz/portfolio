import db from "@/app/lib/data";
import { sql } from "kysely";
import { NextRequest } from "next/server";

async function getTotalCount(
  searchTerm: string,
  category: string
) {
  let query = db
    .selectFrom("gallery")
    .select(sql`count(*)`
    .as("total_count"));

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

async function getSearchResults(
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

async function searchHandler(
  searchTerm: string,
  page: number,
  limit: number,
  seed: number,
  category: string
): Promise<any> {
  const searchResult = await getSearchResults(
    searchTerm,
    page,
    limit,
    seed,
    category
  );
  const totalCount = await getTotalCount(searchTerm, category);

  return { searchResult, totalCount };
}

export async function GET(request: NextRequest) {
  console.log("Requesting Photos...");

  const searchParams = request.nextUrl.searchParams;

  const queryRequest = searchParams.get("query") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const seed = parseInt(searchParams.get("seed") ?? "0", 10);

  const category = searchParams.get("category") ?? "";

  const { searchResult: result, totalCount: total } = await searchHandler(
    queryRequest,
    page,
    limit,
    seed,
    category
  );

  return new Response(
    JSON.stringify({
      result: result,
      total: total,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
