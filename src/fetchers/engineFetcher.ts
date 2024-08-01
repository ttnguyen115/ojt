import { axiosInstance } from "./axiosInstance"

const engineFetcher = async (modelName: string, make: string) => {
    const res = await axiosInstance.get(`engines?year=2019`, { params: { model: modelName, make: make } })
    return res.data
}

export default engineFetcher