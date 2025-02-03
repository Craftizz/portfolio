import { NextRequest } from "next/server";
import { getSearchResults, getTotalCount } from "@/service/ServerQueryService";
import { Filters } from "@/types/filters";

async function searchHandler(
  filters: Filters,
  page: number,
  limit: number,
  seed: number,
): Promise<any> {
  
  const searchResult = await getSearchResults(filters, page, limit, seed);
  const totalCount = await getTotalCount(filters);

  return { searchResult, totalCount };
}

export async function GET(request: NextRequest) {
  console.log("Requesting Photos...");

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const seed = parseInt(searchParams.get("seed") ?? "0", 10);

   const filters: Filters = {
     query: searchParams.get("query") ?? "",
     category: searchParams.get("category") ?? "",
     location: searchParams.get("location") ?? "",
     time: searchParams.getAll("time") ?? "",
     frame: searchParams.getAll("frame") ?? "",
   };

  const { searchResult: result, totalCount: total } = await searchHandler(filters, page, limit, seed);

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
