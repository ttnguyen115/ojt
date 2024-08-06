import { axiosInstance } from "./axiosInstance"

const exteriorColorFetcher = async (modelName: string, make: string) => {
    const res = await axiosInstance.get(`/exterior-colors?year=2019`, { params: { model: modelName, make: make } })

    return res.data
}

export default exteriorColorFetcher