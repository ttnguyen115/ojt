import React from 'react';
import { seedingData } from '../../../utils';
import { Car } from '../../../contracts/types/car';
import { faker } from '@faker-js/faker';
function CarCard({ car }: { car: Car }) {
    return (
        <>
            <div className='car-card border-gray-200 border-2 rounded-md h-full '>
                <div className=' '>
                    <img
                        src={car.image}
                        alt='car'
                    />
                </div>
                <div className='p-4 flex flex-col justify-between'>
                    <h4 className='font-semibold'>{`${car.make} ${car.name} `}</h4>
                    <p
                        className='font-semibold text-gray-500 py-2'
                        suppressHydrationWarning={true}>
                        {`${car.mileage} miles`}
                    </p>
                    <h3
                        suppressHydrationWarning={true}
                        className='font-bold'>
                        {Number(car.price).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                        })}
                    </h3>
                    <div
                        suppressHydrationWarning={true}
                        className=''>
                        {faker.location.streetAddress()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarCard;
