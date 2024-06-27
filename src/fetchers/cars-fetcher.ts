import { axiosInstance } from '.';

export default async function carsFetcher(url: string) {
    const data = await axiosInstance.get(url);

    return data || {};
}
