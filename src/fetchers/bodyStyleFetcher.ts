import { axiosInstance } from "./axiosInstance"

const bodyStyleFetcher = async (modelName: string, make: string) => {
    const res = await axiosInstance.get(`/bodies?verbose=yes&year=2019`, { params: { model: modelName, make: make } })

    return res.data
}
export default bodyStyleFetcher