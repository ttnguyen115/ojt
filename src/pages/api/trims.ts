import { trimsFetcher } from '@fetchers/carsFetcher'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Max-Age', '600'); // Cache preflight response for 10 minutes

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    const queries = req.query

    const response = await trimsFetcher(queries.model?.toString() || '', queries.make?.toString() || '')


    console.log('re', response.data);



    return res.status(200).json({ data: response.data })
}
