import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import React from 'react';

function DesktopFilterDropdown({ components }) {
    const bodies = components.bodiestype;
    const cylinders = components.enginescylinders;
    const fuelTypes = components.enginesType;
    return (
        <div className='w-full h-full overflow-y-scroll'>
            <details className=''>
                <summary className=''>
                    <b>Bodies</b>
                </summary>
                <div className='dropdown-content'>
                    {bodies.map((item, index) => (
                        <div key={index}> {item}</div>
                    ))}
                </div>
            </details>
            <details className=''>
                <summary className=''>
                    <b>Cylinders</b>
                </summary>
                <div className='dropdown-content'>
                    {cylinders.map((item, index) => (
                        <div key={index}> {item}</div>
                    ))}
                </div>
            </details>
            <details className=''>
                <summary className=''>
                    <b>Fuel Types</b>
                </summary>
                <div className='dropdown-content'>
                    {fuelTypes.map((item, index) => (
                        <div key={index}> {item}</div>
                    ))}
                </div>
            </details>
            <details className=''>
                <summary className=''>
                    <b>Interior Color</b>
                </summary>
            </details>
            <details className=''>
                <summary className=''>
                    <b>Exterior Color</b>
                </summary>
            </details>
            <details className=''>
                <summary className=''>
                    <b>Mileage</b>
                </summary>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col '>
                        <label htmlFor='min-mileage'>Min</label>
                        <input
                            type='text'
                            placeholder='Min'
                            className='w-3/4'
                            id='min-mileage'
                        />
                    </div>
                    <div className='flex flex-col '>
                        <label htmlFor='max-mileage'>Max</label>
                        <input
                            type='text'
                            placeholder='Max'
                            className='w-3/4'
                            id='max-mileage'
                        />
                    </div>
                </div>
            </details>
        </div>
    );
}

export default DesktopFilterDropdown;
