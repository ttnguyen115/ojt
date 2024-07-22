import { Car } from "@contracts/index";

export default function filterCars(cars: Car[], makeName: string) {
    if (makeName !== '') {
        const models = cars.filter(
            (car: Car) => car.make_name === makeName,
        );
        return models
    } else return cars
}