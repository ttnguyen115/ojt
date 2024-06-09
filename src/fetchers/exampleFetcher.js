import { fetcher } from ".";

export default async function testFetcher() {
    const data = await fetcher("/abc", {
        headers: {},
    });

    return data || {};
}
