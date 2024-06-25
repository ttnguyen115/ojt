import React from 'react';
import { seedingData } from '../../../utils';
import { Car } from '../../../contracts/types/car';
import { faker } from '@faker-js/faker';
import Divider from '../Divider/divider';
function CarCard({ car }: { car: Car }) {
    return (
        <>
            <div className='car-card border-gray-200 border-2 rounded-md '>
                <div className='bg-gray-500'>
                    <div className='max-w-sm mx-auto   h- '>
                        <img
                            src={car.image}
                            alt='car'
                        />
                    </div>
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
                        className='font-bold text-2xl'>
                        {Number(car.price).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                        })}
                    </h3>
                    <Divider />
                    <div
                        suppressHydrationWarning={true}
                        className='text-sm text-gray-500'>
                        {faker.location.streetAddress()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarCard;
