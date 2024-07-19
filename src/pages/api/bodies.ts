import bodyStyleFetcher from "@fetchers/bodyStyleFetcher";
import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextRequest, res: NextApiResponse) {
    const params = req.nextUrl.searchParams

    const response = await bodyStyleFetcher(params.get('model') || '', params.get('make') || '')

    // return res.status(200).json({ data: response })
}
