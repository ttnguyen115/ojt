import React from 'react';

function CarCard({ carNumber }: { carNumber: number }) {
    return (
        <>
            <div className='w-full h-full border-gray-200 border-2 rounded-md'>
                {`CarCard ${carNumber}`}
            </div>
        </>
    );
}

export default CarCard;
