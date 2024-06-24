import React from 'react';
import CarCard from '../car-card/car-card';
import duckCreator from '@/ducks/duck-creator';
import { Car } from '@/contracts/types/car';
import { useSelector } from 'react-redux';
import { getMakeFromId, seedingData } from '@/utils';
import { faker } from '@faker-js/faker';

function CarHolder() {
    const { cars = [] } = useSelector(duckCreator.selectors.getAllCars);

    cars.forEach((car: Car) => {
        car.mileage = seedingData.generateRandomAmount(2020);
        car.make = getMakeFromId(car.make_id);
        car.price = faker.number.int({
            min: 10000,
            max: 1000000,
        });
        car.image = seedingData.generateVehicleImage();
    });
    return (
        <div className='border-gray-200 border-2 rounded-md w-full p-4'>
            <div className='mb-4'>CarHolder</div>
            <div className='grid sm:grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {cars.slice(10, 25).map((car: Car) => (
                    <div
                        className='w-full '
                        key={car.id}>
                        <CarCard car={car} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarHolder;
