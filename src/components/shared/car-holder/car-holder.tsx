import React from 'react';
import CarCard from '../car-card/car-card';
import duckCreator from '@/ducks/duck-creator';
import { Car } from '@/types/car';
import { useSelector } from 'react-redux';
import { getMakeFromId } from '@/utils';

function CarHolder() {
    const { cars = [] } = useSelector(duckCreator.selectors.getAllCars);

    cars.forEach((car: Car) => {
        car.make = getMakeFromId(car.make_id);
    });
    return (
        <div className='border-gray-200 border-2 rounded-md w-full p-4'>
            <div className='mb-4'>CarHolder</div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {cars.slice(10, 25).map((car: Car) => (
                    <div
                        className='w-full'
                        key={car.id}>
                        <CarCard car={car} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarHolder;
