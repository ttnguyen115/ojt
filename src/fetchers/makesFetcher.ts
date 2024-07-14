import { axiosInstance } from "./axiosInstance";

export async function makesFetcher(url: string) {
    const data = await axiosInstance.get(url);
    return data || {};

}