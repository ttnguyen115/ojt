import { Car } from "@contracts/index";

export default function filterTrims(models: Car[], modelId: number) {
    const trims = models.filter(
        (car: Car) => car.id === modelId)
    return trims
}