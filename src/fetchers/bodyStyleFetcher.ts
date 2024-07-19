import { axiosInstance } from "./axiosIntance"

const bodyStyleFetcher = async (modelName: string | null, make: string | null) => {
    const res = await axiosInstance.get(`/bodies?verbose=yes&make=${make}&model=${modelName}&year=2019`)

    return res.data
}
export default bodyStyleFetcher