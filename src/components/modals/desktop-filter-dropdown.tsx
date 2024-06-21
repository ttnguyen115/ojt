import duckCreator from '@/ducks/duck-creator';
import { indexOf } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';

function DesktopFilterDropdown({ components }) {
    const bodies = components.bodiestype;
    const cylinders = components.enginescylinders;
    const fuelTypes = components.enginesType;
    const { interiorColors } = useSelector(
        duckCreator.selectors.getAllInteriorColors,
    );
    const { exteriorColors } = useSelector(
        duckCreator.selectors.getAllExteriorColors,
    );
    const [mileage, setMileage] = React.useState([0, 0]);
    const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.id === 'min-mileage'
            ? setMileage([
                  (mileage[0] = parseInt(e.currentTarget.value)),
                  mileage[1],
              ])
            : setMileage([
                  mileage[0],
                  (mileage[1] = parseInt(e.currentTarget.value)),
              ]);
    };

    return (
        <div className='w-full h-full overflow-y-scroll'>
            <details>
                <summary>
                    <b>Body Style</b>
                </summary>
                <div className='dropdown-content'>
                    {bodies.map((item, index: number) => (
                        <div key={index}> {item}</div>
                    ))}
                </div>
            </details>
            <details>
                <summary>
                    <b>Cylinders</b>
                </summary>
                <div className='dropdown-content'>
                    {cylinders.map((item, index) => (
                        <div key={index}>
                            {' '}
                            <input
                                type='checkbox'
                                name={`cyl-${index + 1}`}
                                id={`cyl-${index + 1}`}
                                className='mr-2'
                            />
                            <label htmlFor={`cyl-${index + 1}`}>{item}</label>
                        </div>
                    ))}
                </div>
            </details>
            <details>
                <summary>
                    <b>Fuel Type</b>
                </summary>
                <div className='dropdown-content'>
                    {fuelTypes.map((item, index) => (
                        <div key={index}>
                            {' '}
                            <input
                                type='checkbox'
                                name={`fuel-${index + 1}`}
                                className='mr-2'
                                id={`fuel-${index + 1}`}
                            />
                            <label htmlFor={`fuel ${index + 1}`}>{item}</label>
                        </div>
                    ))}
                </div>
            </details>
            <details>
                <summary>
                    <b>Interior Color</b>
                </summary>
                <div className='grid grid-cols-3 container h-32 w-full overflow-y-scroll gap-2'>
                    {interiorColors.map((color, index) => (
                        <div
                            key={index}
                            className=' border-2 border-gray-200 w-10 h-10 rounded-full'
                            style={{ backgroundColor: color }}></div>
                    ))}
                </div>
            </details>
            <details>
                <summary>
                    <b>Exterior Color</b>
                </summary>
                <div className='grid grid-cols-3 container h-32 w-full overflow-y-scroll gap-y-2 gap-x-5'>
                    {exteriorColors.map((color, index) => (
                        <div
                            key={index}
                            className='border-2 border-gray-200 w-10 h-10 rounded-full'
                            style={{ backgroundColor: color }}></div>
                    ))}
                </div>
            </details>
            <details>
                <summary>
                    <b>Mileage</b>
                </summary>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col '>
                        <label htmlFor='min-mileage'>Min</label>
                        <input
                            pattern='[^0-9.]'
                            type='text'
                            placeholder='Min'
                            className='w-3/4 '
                            id='min-mileage'
                            value={mileage[0] || 0}
                            onChange={(e) => handleMileageChange(e)}
                        />
                    </div>
                    <div className='flex flex-col '>
                        <label htmlFor='max-mileage'>Max</label>
                        <input
                            type='text'
                            pattern='[^0-9.]'
                            placeholder='Max'
                            className='w-3/4'
                            id='max-mileage'
                            value={mileage[1] || 0}
                            onChange={(e) => handleMileageChange(e)}
                        />
                    </div>
                </div>
            </details>
        </div>
    );
}

export default DesktopFilterDropdown;
