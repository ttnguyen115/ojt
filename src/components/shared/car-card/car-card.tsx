import React from 'react';
import { seedingData } from '../../../utils';
import { Car } from '../../../types/car';

function CarCard({ car }: { car: Car }) {
    return (
        <>
            <div className='w-full h-full border-gray-200 border-2 rounded-md'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='h-1/2'>
                        <img
                            className='w-full h-full object-contain'
                            src={seedingData.generateVehicleImage()}
                            alt='car'
                        />
                    </div>
                    <div>{`${car.make} ${car.name} `}</div>
                    <div suppressHydrationWarning={true}></div>
                    <div suppressHydrationWarning={true}>
                        {Number(
                            seedingData.generateRandomAmount(2020),
                        ).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </div>
                    {/* <div>Dealer Address</div> */}
                </div>
            </div>
        </>
    );
}

export default CarCard;
