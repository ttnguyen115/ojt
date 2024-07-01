import axios from 'axios';

const baseUrl = 'https://carapi.app/api';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization:
            `Bearer ${process.env.TOKEN}`,
        "Content-Type": "text/plain"
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