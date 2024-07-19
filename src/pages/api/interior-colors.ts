import interiorColorFetcher from "@fetchers/interiorColorFetcher";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextRequest, res: NextApiResponse) {
    const params = req.nextUrl.searchParams
    if (!params) {
        res.status(400).json({ error: 'Missing query parameters' })
    }
    const response = await interiorColorFetcher(params.get('model'), params.get('make'))
    console.log(response.data);
    // return res.status(200).json({ data: response.data })
}
