//react
import React from 'react';

//duck
import duckCreator from '@ducks/duck-creator';

//redux
import { useSelector } from 'react-redux';

//data generator
import { faker } from '@faker-js/faker';
import seedingData from '@utils/seedingData';
import getMakeFromId from '@utils/get-make-from-id';

//components
import CarCard from '../car-card/car-card';

//types
import { Car } from '@contracts/types/car';

function CarHolder() {
    const { cars = [] } = useSelector(duckCreator.selectors.getAllCars);

    cars.length > 0 &&
        cars.forEach((car: Car) => {
            car.mileage = seedingData.generateRandomAmount(2020);
            car.make = getMakeFromId(car.make_id);
            car.price = faker.number.int({
                min: 10000,
                max: 300000,
            });
            car.image = seedingData.generateVehicleImage();
        });

    return (
        <div className='border-gray-200 border-2 rounded-md w-full p-4'>
            <div className='mb-4'>CarHolder</div>
            <div className='grid grid-cols-12 gap-4 '>
                {cars.length > 0 &&
                    cars.slice(10, 25).map((car: Car) => (
                        <div
                            className='sm:col-span-12 md:col-span-4'
                            key={car.id}
                        >
                            <CarCard car={car} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default CarHolder;
