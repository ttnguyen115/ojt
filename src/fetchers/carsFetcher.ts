import { axiosInstance } from "./axiosInstance";

export default async function carsFetcher(make: string, model: string) {


    const res = await axiosInstance.get(`/models?sort=asc&year=2019&make=${make}&model=${model}`
    );

    return res.data || {};
}

export async function trimsFetcher(url: string) {
    const data = await axiosInstance.get(url);

    return data.data || {};

} 