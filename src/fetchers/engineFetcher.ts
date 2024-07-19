import { axiosInstance } from "./axiosIntance"

const engineFetcher = async (modelName: string | null, make: string | null) => {
    const res = await axiosInstance.get(`engines?model=${modelName}&make=${make}&year=2019`)
    return res.data
}

export default engineFetcher