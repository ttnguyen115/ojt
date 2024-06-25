//duck
import duckCreator from '@ducks/duck-creator';

//get color name
import { ntc } from '@utils/ntc';

//lodash
import { indexOf } from 'lodash';

//react
import React, { MouseEventHandler } from 'react';

//redux
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

    const handleAnchorTagClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        detailsId: string,
    ) => {
        e.preventDefault();
        const details = document.getElementsByTagName('details');
        const selectedDetails = details.namedItem(detailsId);
        if (selectedDetails!.open === true) {
            selectedDetails!.open = false;
            selectedDetails?.scrollIntoView({ behavior: 'smooth' });
        } else {
            selectedDetails!.open = true;
            selectedDetails?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='w-full h-full overflow-y-scroll '>
            <div className='divider'>
                <details id='mileage '>
                    <summary>
                        <b>Mileage</b>
                    </summary>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col '>
                            <label
                                htmlFor='min-mileage'
                                className='text-gray-400 font-semibold'
                            >
                                Min
                            </label>
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
                            <label
                                htmlFor='max-mileage'
                                className='text-gray-400 font-semibold'
                            >
                                Max
                            </label>
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
            <div className='divider'>
                <details id='bodies'>
                    <summary>
                        <a
                            href='#bodies'
                            onClick={(e) => handleAnchorTagClick(e, 'bodies')}
                        >
                            <b>Body Style</b>
                        </a>
                    </summary>
                    <div className='dropdown-container'>
                        {bodies.map((item: string, index: number) => (
                            <div key={index}>
                                <input
                                    type='checkbox'
                                    name={`body-${index + 1}`}
                                    id={`body-${index + 1}`}
                                    className='mr-2'
                                />
                                <label
                                    htmlFor={`body-${index + 1}`}
                                    className='mr-2'
                                >
                                    {item.charAt(0).toUpperCase() +
                                        item.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                </details>
            </div>
            <div className='divider'>
                <details id='fuel-type'>
                    <summary>
                        <b>
                            <a
                                href='#fuel-type'
                                onClick={(e) =>
                                    handleAnchorTagClick(e, 'fuel-type')
                                }
                            >
                                Fuel Type{' '}
                            </a>
                        </b>
                    </summary>
                    <div className='dropdown-container'>
                        {fuelTypes.map((item: string, index: number) => (
                            <div key={index}>
                                <input
                                    type='checkbox'
                                    name={`fuel-${index + 1}`}
                                    className='mr-2'
                                    id={`fuel-${index + 1}`}
                                />
                                <label htmlFor={`fuel-${index + 1}`}>
                                    {item.charAt(0).toUpperCase() +
                                        item.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                </details>
            </div>
            <div className='divider'>
                <details id='interior-color'>
                    <summary>
                        <b>
                            <a
                                href='#interior-color'
                                onClick={(e) =>
                                    handleAnchorTagClick(e, 'interior-color')
                                }
                            >
                                Interior Color
                            </a>
                        </b>
                    </summary>
                    <div className='grid grid-cols-3 container h-40 w-full overflow-y-scroll gap-y-2 gap-x-5 my-4'>
                        {interiorColors.map((color: string, index: number) => (
                            <div className='flex flex-col items-center'>
                                <div
                                    key={color}
                                    className=' border-2 border-gray-200 w-10 h-10 rounded-full'
                                    style={{
                                        backgroundColor: `#${color}`,
                                    }}
                                ></div>
                                <div className='text-center'>
                                    {ntc.name(color)[1]}
                                </div>
                            </div>
                        ))}
                    </div>
                </details>
            </div>
            <div className='divider'>
                <details id='exterior-color'>
                    <summary>
                        <b>
                            <a
                                href='#exterior-color'
                                onClick={(e) =>
                                    handleAnchorTagClick(e, 'exterior-color')
                                }
                            >
                                Exterior Color
                            </a>
                        </b>
                    </summary>
                    <div className='grid grid-cols-3 container h-32 w-full overflow-y-scroll gap-y-2 gap-x-5 my-4'>
                        {exteriorColors.map((color: string, index: number) => (
                            <div className='flex flex-col items-center'>
                                <div
                                    key={color}
                                    className='border-2 border-gray-200 w-10 h-10 rounded-full'
                                    style={{
                                        backgroundColor: `#${color}`,
                                    }}
                                ></div>
                                <div className='text-center'>
                                    {ntc.name(color)[1]}
                                </div>
                            </div>
                        ))}
                    </div>
                </details>
            </div>
            <div className='divider '>
                <details id='cylinders'>
                    <summary>
                        <b>
                            {' '}
                            <a
                                href='#cylinders'
                                onClick={(e) =>
                                    handleAnchorTagClick(e, 'cylinders')
                                }
                            >
                                Cylinders{' '}
                            </a>
                        </b>
                    </summary>
                    <div className='dropdown-container'>
                        {cylinders.map((item: number, index: number) => (
                            <div key={index}>
                                <input
                                    type='checkbox'
                                    name={`cyl-${index + 1}`}
                                    id={`cyl-${index + 1}`}
                                    className='mr-2'
                                />
                                <label
                                    htmlFor={`cyl-${index + 1}`}
                                >{`${item} cylinders`}</label>
                            </div>
                        ))}
                    </div>
                </details>
            </div>
        </div>
    );
}

export default DesktopFilterDropdown;
