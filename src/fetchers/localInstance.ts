import axios from "axios";
import { error } from "console";

const localInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        // Authorization:
        //     `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        "Content-Type": "text/plain"
    },
})

localInstance.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res.data;
    }
    else if (res.status === 401) {
        console.error('Unauthorized', res.data);
    }
}, (error) => {
    console.error('Error in fetching data', error);
    return {};
})
export default localInstance
