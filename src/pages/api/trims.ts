import { trimsFetcher } from '@fetchers/carsFetcher'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const queries = req.query
    console.log('queries', queries);

    const response = await trimsFetcher(queries.model?.toString() || '', queries.make?.toString() || '')


    return res.status(200).json({ data: response })
}
