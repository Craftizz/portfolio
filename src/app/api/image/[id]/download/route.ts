import db from '@/app/lib/data';
import { NextRequest, NextResponse } from 'next/server';

import { readFile } from 'fs/promises';
import path from 'path';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {


//   const id = (await params).id;

//   if (!id) {

//       return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
//   }

//   const image = path.join(process.cwd(), 'public', 'images', 'original', `${id}.jpg`);
//   const buffer = await readFile(image);

//   const headers = new Headers();
//   headers.append('Content-Disposition', `attachment; filename="${id}.png"`);
//   headers.append('Content-Type', 'image/png');

//   return new Response(buffer, {
//     headers,
//   });
// };

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {

    const id = (await params).id;
    let ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For")?.split(",").at(0) ||
      "0.0.0.0";

    let country = request.headers.get("CF-Connecting-IP") || "XX";

    if (!id) {

        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    try {
        
      const result = await db
        .insertInto('downloads')
        .values({
          image_id: id,
          user_ip: ip,
          country: country
        })
        .onConflict((oc) => oc.columns(['image_id', 'user_ip']).doNothing())
        .execute();


        return NextResponse.json({ success: true });

    } catch (error) {

        return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
    }
}