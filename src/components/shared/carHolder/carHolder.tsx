//react
import React, { useEffect } from 'react';

//components
import CarCard from '../carCard/carCard';

//types
import { Car } from '@contracts/types/car';

//redux-selectors
import { getFilters } from '@redux/selectors';
function CarHolder() {

    let filters = getFilters();

    return (
        <div className='w-full '>
            <div className='grid grid-cols-12 gap-4 '>
                {filters.filteredCars &&
                    filters.filteredCars.map((car: Car) => (
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
