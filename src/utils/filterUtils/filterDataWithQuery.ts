const filterDataWithQuery = (data: any[], query: string[]) => {
    console.log('data', data);

    query.map((q) => {
        console.log('query', q);
        data.map((d) => {

            const key = Object.keys(d).find(key => String(d[key]).localeCompare(q, undefined, { sensitivity: 'base' }) === 0)
            console.log('ll', key);
        })

    })
    return 1
}
export default filterDataWithQuery