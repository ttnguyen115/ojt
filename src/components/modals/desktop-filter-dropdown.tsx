//duck
import duckCreator from '@ducks/duck-creator';

//react
import React, { MouseEvent, MouseEventHandler } from 'react';

//redux
import { useSelector } from 'react-redux';

//components
import { CheckboxInput, TextInput } from '@components/inputs/input';
import FilterComponent, {
    ColorFilter,
} from '@components/shared/filters/filter-component';

function DesktopFilterDropdown({ components }) {
    const bodies = components.bodiestype;
    const cylinders = components.enginescylinders;
    const fuelTypes = components.enginesType;

    const { interiorColors }: any = useSelector(
        duckCreator.selectors.getAllInteriorColors,
    );
    const { exteriorColors }: any = useSelector(
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
            <FilterComponent
                filterName='Mileage'
                id='mileage'
            >
                <div className='flex flex-row justify-between'>
                    <TextInput
                        filterName='Min'
                        id='mileage'
                        onChange={handleMileageChange}
                        placeholder='Min'
                        value={mileage[0] || 0}
                        className='flex-col-reverse'
                    />
                    <TextInput
                        filterName='Max'
                        id='mileage'
                        onChange={handleMileageChange}
                        placeholder='Max'
                        value={mileage[1] || 0}
                        className='flex-col-reverse'
                    />
                </div>
            </FilterComponent>
            <FilterComponent
                filterName='Body Style'
                href='#bodies'
                id='bodies'
                onClick={(e: MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                    handleAnchorTagClick(e, 'bodies')
                }
            >
                <div className='dropdown-container'>
                    {bodies.map((item: string, index: number) => (
                        <div key={index}>
                            <CheckboxInput
                                filterName={item}
                                id={`body-${index + 1}`}
                                onChange={() => {}}
                                // className='flex-row items-start'
                            />
                        </div>
                    ))}
                </div>
            </FilterComponent>
            <FilterComponent
                filterName='Fuel Type'
                href='#fuel-type'
                id='fuel-type'
                onClick={(e: MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                    handleAnchorTagClick(e, 'fuel-type')
                }
            >
                <div className='dropdown-container'>
                    {fuelTypes.map((item: string, index: number) => (
                        <div key={index}>
                            <CheckboxInput
                                filterName={
                                    item.charAt(0).toUpperCase() + item.slice(1)
                                }
                                id={`fuel-${index + 1}`}
                                onChange={() => {}}
                                // className='flex-row items-start'
                            />
                        </div>
                    ))}
                </div>
            </FilterComponent>
            <FilterComponent
                filterName='Interior Color'
                href='#interior-color'
                id='interior-color'
                onClick={(e: MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                    handleAnchorTagClick(e, 'interior-color')
                }
            >
                <ColorFilter colors={interiorColors} />
            </FilterComponent>

            <FilterComponent
                filterName='Exterior Color'
                href='#exterior-color'
                id='exterior-color'
                onClick={(e: MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                    handleAnchorTagClick(e, 'exterior-color')
                }
            >
                <ColorFilter colors={exteriorColors} />
            </FilterComponent>
            <FilterComponent
                filterName='Cylinders'
                href='#cylinders'
                id='cylinders'
                onClick={(e: MouseEvent<HTMLAnchorElement, MouseEvent>) =>
                    handleAnchorTagClick(e, 'cylinders')
                }
            >
                <div className='dropdown-container '>
                    {cylinders.map((item: string, index: number) => (
                        <div key={index}>
                            <CheckboxInput
                                filterName={`${item} cylinders`}
                                id={`cyl-${index + 1}`}
                                onChange={() => {}}
                                // className='flex-row items-start'
                            />
                        </div>
                    ))}
                </div>
            </FilterComponent>
        </div>
    );
}

export default DesktopFilterDropdown;
