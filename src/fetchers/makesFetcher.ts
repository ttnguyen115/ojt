import { axiosInstance } from "./axiosIntance";

export default async function makesFetcher(url: string) {
    const data = await axiosInstance.get(url);
    return data || {};

}