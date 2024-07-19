import { Trim } from "./trim"

export type Car = {
    id: number,
    name: string,
    make_id: number,
    price: number,
    mileage: number,
    image: string
    make_name?: string,
    trims?: Trim[],
    selectedTrim?: string,
}

