import { Car } from "./car";
import { Color } from "./color";
import { Make } from "./make";

export interface Filter {
    enginescylinders: number[];
    bodiesType: string[];
    enginesdriveType: string[];
    enginesType: string[];
    enginestransmission: string[];
    enginesvalveTiming: string[];
    enginesvalves: number[];
    filteredCars: Car[]
    cars: Car[]
    makes: Make[],
    interiorColors: Color[],
    exteriorColors: Color[],
}
