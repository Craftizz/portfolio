import { NextRequest } from "next/server";
import { getSearchResults, getTotalCount } from "@/service/ServerQueryService";

async function searchHandler(
  searchTerm: string,
  page: number,
  limit: number,
  seed: number,
  category: string
): Promise<any> {
  
  const searchResult = await getSearchResults(searchTerm, category, page, limit, seed);
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
