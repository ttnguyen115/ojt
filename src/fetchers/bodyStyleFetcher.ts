import { axiosInstance } from "./axiosInstance"

const bodyStyleFetcher = async (modelName: string, make: string) => {
    const res = await axiosInstance.get(`/bodies?verbose=yes&make=${make}&model=${modelName}&year=2019`)

    return res.data
}
export default bodyStyleFetcher