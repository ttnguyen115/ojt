
const filterState = (data: any[], keysToFilter: string[]) => {
    const bodiesMap = new Map();

    data.forEach((body) => {
        let key;
        if (keysToFilter.length > 1) {
            key = keysToFilter.map(k => body[k]).join('-'); // Create a composite key for multiple properties
            bodiesMap.set(key, keysToFilter.reduce((obj, k) => ({ ...obj, [k]: body[k] }), {}));
        } else {
            key = body[keysToFilter[0]];
            bodiesMap.set(key, { [keysToFilter[0]]: body[keysToFilter[0]] });
        }
    });

    const bodiesSet = new Set(bodiesMap.values());


    return Array.from(bodiesSet);
}


export default filterState