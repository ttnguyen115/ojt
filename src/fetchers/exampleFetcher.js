import { fetcher } from '.';

export default async function testFetcher() {
    const data = await fetcher('/models?sort=asc&year=2015', {
        headers: {},
    });

    return data || {};
}
