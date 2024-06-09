const baseUrl = 'http://localhost:3000/api';

export async function fetcher(url, options = {}) {
    options = {
        method: "GET",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    };

    const appUrl = baseUrl + url;
    const response = await fetch(appUrl, options);
    
    try {
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(`Failure in fetching data from ${url} with status ${response.status}`, error);
        return {};
    }
}

export { default as testFetcher } from "./exampleFetcher";
