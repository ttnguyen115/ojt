import duckCreator from "@/ducks/duck-creator";
import { Make } from "@/types/make";
import { useSelector } from "react-redux";

export default function getMakeFromId(id: number) {
    const { makes = [] } = useSelector(duckCreator.selectors.getAllMakes);
    const make = makes.find((make: Make) => make.id === id);
    return make.name

}