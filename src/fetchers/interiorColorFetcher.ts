import { axiosInstance } from "./axiosInstance"

const interiorColorFetcher = async (modelName: string | null, make: string | null) => {
    const res = await axiosInstance.get(`/interior-colors?year=2019`, { params: { model: modelName, make: make } })
    return res.data
}

export default interiorColorFetcher