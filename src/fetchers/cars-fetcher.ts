import { axiosInstance } from '.';

export default async function carsFetcher(url: string) {
    const data = await axiosInstance.get(url);

    return data || {};
}

export async function trimsFetcher(url: string) {
    const data = await axiosInstance.get(url);

    return data || {};

}   