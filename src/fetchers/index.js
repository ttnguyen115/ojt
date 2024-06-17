const baseUrl = 'https://carapi.app/api';

export async function fetcher(url, options = {}) {
    options = {
        method: 'GET',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiZDViNzE4OTEtMjczMC00YWYxLWI1OGYtOTdhNmIyN2I3ZTI5IiwiYXVkIjoiZDViNzE4OTEtMjczMC00YWYxLWI1OGYtOTdhNmIyN2I3ZTI5IiwiZXhwIjoxNzE5MjE5MDUxLCJpYXQiOjE3MTg2MTQyNTEsImp0aSI6IjRjMjM3ZjM4LTJlYWItNGQ0Yi1hZDEyLWQ3ZTlhNTE2Yzc0MSIsInVzZXIiOnsic3Vic2NyaWJlZCI6ZmFsc2UsInN1YnNjcmlwdGlvbiI6bnVsbCwicmF0ZV9saW1pdF90eXBlIjoiaGFyZCIsImFkZG9ucyI6eyJhbnRpcXVlX3ZlaGljbGVzIjpmYWxzZSwiZGF0YV9mZWVkIjpmYWxzZX19fQ.9BkRrsrJ6gUepp-WUWIQmtwuuc29zq_X6VXpnz3eNqI',
        },
    };

    const appUrl = baseUrl + url;
    const response = await fetch(appUrl, options);

    try {
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(
            `Failure in fetching data from ${url} with status ${response.status}`,
            error,
        );
        return {};
    }
}

export { default as testFetcher } from './exampleFetcher';
