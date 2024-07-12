//react
import React from 'react';

//components
import CarCard from '../carCard/carCard';

//types
import { Car } from '@contracts/types/car';

//redux-selectors
import { getCars } from '@redux/selectors';

function CarHolder() {
    const cars: Car[] = getCars();
    // let makes = getMakes();

    // cars = seedingData.carDataGenerator(cars, makes);
    return (
        <div className='border-gray-200 border-2 rounded-md w-full p-4'>
            <div className='mb-4'>CarHolder</div>
            <div className='grid grid-cols-12 gap-4 '>
                {cars.slice(10, 25).map((car: Car) => (
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
