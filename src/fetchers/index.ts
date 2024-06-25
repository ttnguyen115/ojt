import axios from 'axios';

const baseUrl = 'https://carapi.app/api';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYXJhcGkuYXBwIiwic3ViIjoiZDViNzE4OTEtMjczMC00YWYxLWI1OGYtOTdhNmIyN2I3ZTI5IiwiYXVkIjoiZDViNzE4OTEtMjczMC00YWYxLWI1OGYtOTdhNmIyN2I3ZTI5IiwiZXhwIjoxNzE5ODg1NzQ1LCJpYXQiOjE3MTkyODA5NDUsImp0aSI6IjExZjQ1YmFhLTI4MmMtNDc4ZS1hMmQwLTVjZDVjZjk4NGEwYSIsInVzZXIiOnsic3Vic2NyaWJlZCI6ZmFsc2UsInN1YnNjcmlwdGlvbiI6bnVsbCwicmF0ZV9saW1pdF90eXBlIjoiaGFyZCIsImFkZG9ucyI6eyJhbnRpcXVlX3ZlaGljbGVzIjpmYWxzZSwiZGF0YV9mZWVkIjpmYWxzZX19fQ.Ey9v2Ges4yP7OXZpV1Ekrgme9NrCkq9xhbFb2UWSFKM',
    },
});
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data;
        }
        else if (response.status === 401) {
            console.error('Unauthorized', response.data);
        }
    },
    (error) => {

        // console.error('Error in fetching dat a', error);
        return {};
    },
);

export { default as carsFetcher } from './cars-fetcher';
