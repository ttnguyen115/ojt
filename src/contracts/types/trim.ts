import { Make } from "./make"

export type Trim = {
    id: number,
    name: string,
    make_model_id: number,
    year: string,
    description: string,
    msrp: number,
    invoice: number,
    created: Date,
    modified: Date
    make_model: MakeModel
}

interface MakeModel {
    id: number,
    make_id: number,
    name: string,
    make: Make
}