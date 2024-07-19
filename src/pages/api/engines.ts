import engineFetcher from "@fetchers/engineFetcher";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextApiResponse) {
    const params = req.nextUrl.searchParams
    if (!params) {
        res.status(400).json({ error: 'Missing query parameters' })
    }
    const response = await engineFetcher(params.get('model'), params.get('make'))
    
    // return res.status(200).json({ data: response.data })
}
