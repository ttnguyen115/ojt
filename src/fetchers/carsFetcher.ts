import { axiosInstance } from "./axiosInstance";

export default async function carsFetcher(make: string, model: string) {


    const res = await axiosInstance.get(`/models?sort=asc&year=2019`, { params: { make: make, model: model } }
    );

    return res.data;
}

export async function trimsFetcher(make: string, model: string) {

    const res = await axiosInstance.get(`/trims?verbose=yes&year=2019`, { params: { make: make, model: model } });


    return res;

} 