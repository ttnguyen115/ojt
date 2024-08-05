const filterDataWithQuery = (data: any[], query: { key: string; value: string | string[] }) => {
    if (query.key && query.value) {
        if (Array.isArray(query.value)) {
            return data.filter((item) => query.value.includes(item[query.key]));
        } else {
            return data.filter((item) => item[query.key] === query.value);
        }
    }
    return data;
};

export default filterDataWithQuery;
