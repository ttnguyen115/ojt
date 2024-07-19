import { Car, Make } from "@contracts/index";

export default function getMakeCarsNumber(makes: Make[], cars: Car[]) {
    makes.forEach((make: Make) => {
        const numberOfCars = cars.filter(
            (car: Car) => car.make_id === make.id,
        ).length;
        make = { ...make, numberOfCars: numberOfCars }
    });
}