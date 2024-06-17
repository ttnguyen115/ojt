import React from 'react';

function CarCard({ carNumber }: { carNumber: number }) {
    return (
        <>
            <div className='w-full h-full border-gray-200 border-2 rounded-md'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='h-1/2'>Car Img</div>
                    <div>Car Name</div>
                    <div>Car Mileage</div>
                    <div>Car Price</div>
                    <div>Dealer Address</div>
                    {`CarCard ${carNumber}`}
                </div>
            </div>
        </>
    );
}

export default CarCard;
