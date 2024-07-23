import { Car } from "./car";

export interface Filter {
    bodiestype: string[];
    enginescylinders: number[];
    enginesdriveType: string[];
    enginesType: string[];
    enginestransmission: string[];
    enginesvalveTiming: string[];
    enginesvalves: number[];
    filteredCars: Car[]
}
