import { axiosInstance } from "./axiosInstance"

const exteriorColorFetcher = async (modelName: string, make: string) => {
    const res = await axiosInstance.get(`/exterior-colors?make=${make}&model=${modelName}&year=2019`)

    return res.data
}

export default exteriorColorFetcher