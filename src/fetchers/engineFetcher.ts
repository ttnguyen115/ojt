import { axiosInstance } from "./axiosInstance"

const engineFetcher = async (modelName: string , make: string ) => {
    const res = await axiosInstance.get(`engines?model=${modelName||''}&make=${make||''}&year=2019`)
    return res.data
}

export default engineFetcher