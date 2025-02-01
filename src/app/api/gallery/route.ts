import { NextRequest } from "next/server";
import { getSearchResults, getTotalCount } from "@/service/ServerQueryService";

async function searchHandler(
  searchTerm: string,
  category: string,
  location: string,
  time: string[],
  frame: string[],
  page: number,
  limit: number,
  seed: number,
): Promise<any> {
  
  const searchResult = await getSearchResults(searchTerm, category, location, time, frame, page, limit, seed);
  const totalCount = await getTotalCount(searchTerm, category, location, time, frame);

  return { searchResult, totalCount };
}

export async function GET(request: NextRequest) {
  console.log("Requesting Photos...");

  const searchParams = request.nextUrl.searchParams;

  const queryRequest = searchParams.get("query") ?? "";
  const categoryRequest = searchParams.get("category") ?? "";
  const locationRequest = searchParams.get("location") ?? "";
  const timeRequest = searchParams.getAll("time") ?? "";
  const frameRequest = searchParams.getAll("frame") ?? "";

  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const seed = parseInt(searchParams.get("seed") ?? "0", 10);

  const { searchResult: result, totalCount: total } = await searchHandler(
    queryRequest,
    categoryRequest,
    locationRequest,
    timeRequest,
    frameRequest,
    page,
    limit,
    seed,
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
