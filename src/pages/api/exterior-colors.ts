import { axiosInstance } from "@fetchers/axiosIntance";
import exteriorColorFetcher from "@fetchers/exteriorColorFetcher";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextRequest, res: NextApiResponse) {
    const params = req.nextUrl.searchParams
    if (!params) {
        res.status(400).json({ error: 'Missing query parameters' })
    }
    const response = await exteriorColorFetcher(params.get('model'), params.get('make'))

    // return res.status(200).json(response.data)
}
