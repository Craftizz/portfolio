import db from '@/app/lib/data';
import { sql } from 'kysely';
import { NextRequest } from 'next/server';

async function getTotalCount(searchTerm: string) {

  let query = db
    .selectFrom('gallery')
    .select(sql`count(*)`.as('total_count'));

  if (searchTerm) {

    query = query.where(sql<boolean>`tsv_search @@ plainto_tsquery('english', ${searchTerm})`);
  }

  const queryResult = await query.executeTakeFirst();

  return queryResult?.total_count ?? 0;
}

async function getSearchResults(searchTerm: string, page: number, limit: number, seed: number): Promise<any> {

  console.log("Querying with seed:", seed)

  const offset = (page - 1) * limit;

  let query = db
    .selectFrom('gallery')
    .select(['id', 'title', 'category', 'base64'])

  if (searchTerm) {

    query = query.where(sql<boolean>`tsv_search @@ plainto_tsquery('english', ${searchTerm})`);
  } else {

    query = query.orderBy(sql`md5(concat(${seed}::text, id::text))`);
  }

  return await query.offset(offset)
                    .limit(limit)
                    .execute();

}

async function searchHandler(searchTerm: string, page: number, limit: number, seed: number): Promise<any> {

  const searchResult = await getSearchResults(searchTerm, page, limit, seed);
  const totalCount = await getTotalCount(searchTerm);

  return { searchResult, totalCount};
}

export async function GET(request: NextRequest) {
  console.log("Requesting Photos...");

  const searchParams = request.nextUrl.searchParams;

  const queryRequest = searchParams.get("query") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const seed = parseInt(searchParams.get("seed") ?? '0', 10);

  const { searchResult: result, totalCount: total } = await searchHandler(
    queryRequest,
    page,
    limit,
    seed
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
    



























// const metaDataFilePath = path.join(process.cwd(), 'server', 'data', 'stills.json');

// function getRequest(searchParams) {

//     const pageRequest = parseInt(searchParams.get('page') || '1');
//     const limitRequest = parseInt(searchParams.get('limit') || '1');

//     return { page: Math.max(pageRequest, 1),
//              limit: Math.max(limitRequest, 1)   
//     };
// }

// async function getMetaData() {

//     const fileContent = await fs.promises.readFile(metaDataFilePath, 'utf-8');

//     return JSON.parse(fileContent);
// }

// export async function GET(request) {

//   try {

//     console.log("Requesting Photos...");

//     const { page, limit } = getRequest(request.nextUrl.searchParams);
//     const metadata = await getMetaData();
  
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const metaDataRequest = metadata.slice(startIndex, endIndex);
//     const hasMoreRequest = page * limit < metadata.length;

//     return new Response(
//       JSON.stringify({
//         metadata: metaDataRequest,
//         hasMore: hasMoreRequest,
//         total: metadata.length
//       }),
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {

//     throw error;
//   }
// }
