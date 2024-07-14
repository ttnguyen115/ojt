import { Make } from "@contracts/types/make"
import duckCreator from "@ducks/duckCreator"
import { useSelector } from "react-redux"

const getMakes = () => {
    const { makes }: { makes: Make[] } = useSelector(duckCreator.selectors.getAllMakes)
    return makes
}

export default getMakes