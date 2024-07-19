import { axiosInstance } from "./axiosIntance"

const exteriorColorFetcher = async (modelName: string | null, make: string | null) => {
    const res = await axiosInstance.get(`/exterior-colors?make=${make}&model=${modelName}&year=2019`)

    return res.data
}

export default exteriorColorFetcher