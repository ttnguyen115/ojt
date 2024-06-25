//duck
import duckCreator from "@ducks/duck-creator";

//redux
import { useSelector } from "react-redux";

//types
import { Make } from "@contracts/types/make";

export default function getMakeFromId(id: number) {
    const { makes = [] } = useSelector(duckCreator.selectors.getAllMakes);
    const make = makes.find((make: Make) => make.id === id);
    return make.name

}