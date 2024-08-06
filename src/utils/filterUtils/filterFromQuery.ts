import duckCreator from "@ducks/duckCreator"
import { useSelector } from "react-redux"

const filterFromQuery = () => {
    const { query }: { query: object } = useSelector(duckCreator.selectors.getQuery)
    return query
}

export default filterFromQuery