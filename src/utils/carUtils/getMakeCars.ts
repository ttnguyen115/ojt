import { Car, Make } from "@contracts/index";
import { getCars, getMakes } from "@redux/selectors";

export default function getMakeCarsNumber(makes: Make[], cars: Car[]) {
    makes.forEach((make: Make) => {
        const numberOfCars = cars.filter(
            (car: Car) => car.make_id === make.id,
        ).length;
        make.numberOfCars = numberOfCars;
    });
}