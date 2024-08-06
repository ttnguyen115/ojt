//react
import React, { memo } from 'react';

//divider
import Divider from '../Divider/divider';

//data generator
import { faker } from '@faker-js/faker';

//types
import { Car } from '@contracts/types/car';

//components
import Image from 'next/image';

//utils
import convertToCurrency from '@utils/stringUtils';

function CarCard({ car }: { car: Car }) {
    return (
        <>
            <div className='car-card border-gray-200 border-2 rounded-md '>
                <div className='bg-gray-500'>
                    <div className='max-w-sm mx-auto '>
                        <Image
                            src={car.image}
                            alt='car'
                            width={100}
                            height={100}
                            priority
                        />
                    </div>
                </div>
                <div className='p-4 flex flex-col justify-between'>
                    <h2 className='font-bold'>{`${car.year} ${car.make_name} ${car.name} `}</h2>
                    <p
                        className='font-semibold text-gray-500 py-2'
                        suppressHydrationWarning
                    >
                        {`${car.mileage} miles`}
                    </p>
                    <h3
                        suppressHydrationWarning
                        className='font-bold text-2xl'
                    >
                        {convertToCurrency(car.price)}
                    </h3>
                    <Divider />
                    <div
                        suppressHydrationWarning
                        className='text-sm text-gray-500'
                    >
                        {faker.location.streetAddress()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(CarCard);
