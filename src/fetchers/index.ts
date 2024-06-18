import axios from 'axios';

const baseUrl = 'https://carapi.app/api';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiZDViNzE4OTEtMjczMC00YWYxLWI1OGYtOTdhNmIyN2I3ZTI5IiwiYXVkIjoiZDViNzE4OTEtMjczMC00YWYxLWI1OGYtOTdhNmIyN2I3ZTI5IiwiZXhwIjoxNzE5MjE5MDUxLCJpYXQiOjE3MTg2MTQyNTEsImp0aSI6IjRjMjM3ZjM4LTJlYWItNGQ0Yi1hZDEyLWQ3ZTlhNTE2Yzc0MSIsInVzZXIiOnsic3Vic2NyaWJlZCI6ZmFsc2UsInN1YnNjcmlwdGlvbiI6bnVsbCwicmF0ZV9saW1pdF90eXBlIjoiaGFyZCIsImFkZG9ucyI6eyJhbnRpcXVlX3ZlaGljbGVzIjpmYWxzZSwiZGF0YV9mZWVkIjpmYWxzZX19fQ.9BkRrsrJ6gUepp-WUWIQmtwuuc29zq_X6VXpnz3eNqI',
    },
});
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.status === 401) {
            console.error('Unauthorized request', error);
        }
        if (error.status === 404) {
            console.error('Not Found', error);

        }
        // console.error('Error in fetching dat a', error);
        return {};
    },
);

export { default as carsFetcher } from './cars-fetcher';
