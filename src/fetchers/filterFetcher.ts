import axios from "axios";

export default async function filtersFetcher() {
    const results = await axios.get('http://localhost:3000/api/filters')

    return results || {};
}