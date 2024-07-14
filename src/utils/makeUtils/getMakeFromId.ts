//types
import { Make } from "@contracts/types/make";

export default function getMakeFromId(makes: Make[], id: number) {
    const make = makes.find((make: Make) => make.id === id);
    return make?.name

}