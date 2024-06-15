import React from 'react';
import CarCard from '../car-card/car-card';

function CarHolder() {
    const numberOfCars = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    return (
        <div className='border-gray-200 border-2 rounded-md w-full p-4'>
            <div className='mb-4'>CarHolder</div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {numberOfCars.map((car) => (
                    <div
                        className='w-full'
                        key={car}>
                        <CarCard carNumber={car} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarHolder;
