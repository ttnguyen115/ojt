import { Car } from '@/types/car';
import React from 'react';

function CarCard({ car }: { car: Car }) {
    return (
        <>
            <div className='w-full h-full border-gray-200 border-2 rounded-md'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='h-1/2'>Car Img</div>
                    <div>{`${car.make} ${car.name} `}</div>
                    {/* <div>Car Mileage</div>
                    <div>Car Price</div>
                    <div>Dealer Address</div> */}
                    {`CarCard ${car.id}`}
                </div>
            </div>
        </>
    );
}

export default CarCard;
