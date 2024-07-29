import { axiosInstance } from "./axiosInstance"

const interiorColorFetcher = async (modelName: string | null, make: string | null) => {
    const res = await axiosInstance.get(`/interior-colors?make=${make}&model=${modelName}&year=2019`)
    return res.data
}

export default interiorColorFetcher