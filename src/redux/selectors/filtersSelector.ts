import { Filter } from "@contracts/index"
import duckCreator from "@ducks/duckCreator"
import { useSelector } from "react-redux"

const getFilters = () => {
    const { filters }: { filters: Filter } = useSelector(duckCreator.selectors.getAllFilters)
    return filters
}
export default getFilters