//duck
import duckCreator from '@ducks/duck-creator';

//react
import React, { MouseEvent, MouseEventHandler, useEffect } from 'react';

//redux
import { useSelector } from 'react-redux';

//components
import { CheckboxInput, TextInput } from '@components/inputs/input';
import FilterComponent, {
    ColorFilter,
} from '@components/shared/filters/filter-component';
import { set } from 'lodash';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Select,
    SelectItem,
} from '@nextui-org/react';
import { Make } from '@contracts/types/make';
import { Car } from '@contracts/types/car';
import { trimsFetcher } from '@fetchers/cars-fetcher';

function DesktopFilterDropdown({ components }) {
    const bodies = components.bodiestype;
    const cylinders = components.enginescylinders;
    const fuelTypes = components.enginesType;
    const { makes = [] } = useSelector(duckCreator.selectors.getAllMakes);
    const { cars = [] } = useSelector(duckCreator.selectors.getAllCars);

    const [mileage, setMileage] = React.useState([0, 0]);
    const [year, setYear] = React.useState([0, 0]);
    const [selectedCar, setSelectedCar] = React.useState<Car>({} as Car);
    const [loading, setLoading] = React.useState(true);
    const [filteredModels, setFilteredModels] = React.useState<Car[]>(cars);
    const { interiorColors }: any = useSelector(
        duckCreator.selectors.getAllInteriorColors,
    );
    const { exteriorColors }: any = useSelector(
        duckCreator.selectors.getAllExteriorColors,
    );

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

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.id === 'min-year'
            ? setYear([(year[0] = parseInt(e.currentTarget.value)), year[1]])
            : setYear([year[0], (year[1] = parseInt(e.currentTarget.value))]);
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

    const getMakeCars = () => {
        {
            if (cars.length > 0 && makes.length > 0) {
                makes.forEach((make: Make) => {
                    const numberOfCars = cars.filter(
                        (car: Car) => car.make_id === make.id,
                    ).length;
                    make.numberOfCars = numberOfCars;
                });
                setLoading(false);
            }
        }
    };

    const getMakeName = (makeId: number) => {
        setSelectedCar({ ...selectedCar, make_id: makeId });
        const make = makes.find((make: Make) => make.id === makeId);
        setSelectedCar({ ...selectedCar, make_name: make?.name, name: '' });
        filterModels(makeId);
    };

    const filterModels = (makeId: number) => {
        const filteredModels = cars.filter(
            (car: Car) => car.make_id === makeId,
        );
        setFilteredModels(filteredModels);
    };

    const fetchTrims = async (modelId: number, makeId: number) => {
        const res = await trimsFetcher(
            `/trims?verbose=yes&year=2019&make_model_id=${modelId}&make_id=${makeId}`,
        );
        console.log(res.data);
    };

    useEffect(() => {
        getMakeCars();
    }, []);

    useEffect(() => {
        console.log(selectedCar);
    }, [selectedCar]);

    return (
        <div className='w-full h-full overflow-y-scroll '>
            {!loading && (
                <>
                    <FilterComponent
                        filterName='Year'
                        id='year'
                    >
                        <div className='flex flex-row justify-between'>
                            <TextInput
                                filterName='Min'
                                id='year'
                                onChange={handleYearChange}
                                placeholder='Min'
                                value={year[0] || 0}
                                className='flex-col-reverse'
                            />
                            <TextInput
                                filterName='Max'
                                id='year'
                                onChange={handleYearChange}
                                placeholder='Max'
                                value={year[1] || 0}
                                className='flex-col-reverse'
                            />
                        </div>
                    </FilterComponent>
                    <FilterComponent
                        filterName='Make, Model & Trim'
                        href='#makes'
                        id='makes'
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'makes')}
                    >
                        <div className='dropdown-container'>
                            <p className='text-gray-400 font-semibold py-2'>
                                {`${selectedCar.make_name} ${selectedCar.name}` ||
                                    'Vehicle 1'}
                            </p>
                            <div>
                                {makes.length > 0 && (
                                    <Select
                                        label='Select Make'
                                        name='makes'
                                        id='makes'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900'
                                        placeholder='Any Make'
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                    >
                                        {makes.map((item: Make) => (
                                            <SelectItem
                                                isDisabled={
                                                    item.numberOfCars === 0
                                                }
                                                key={item.id}
                                                value={item.id}
                                                onClick={() =>
                                                    getMakeName(item.id)
                                                }
                                                className='font-bold'
                                            >
                                                {`${item.name} (${item.numberOfCars})`}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            </div>
                            <div>
                                {selectedCar.make_name && (
                                    <Select
                                        label='Models'
                                        name='models'
                                        id='models'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900'
                                        placeholder='Any'
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                    >
                                        {filteredModels.map(
                                            (car: Car, index: number) => (
                                                <SelectItem
                                                    key={car.id}
                                                    value={car.name}
                                                    onClick={async () => {
                                                        setSelectedCar({
                                                            ...selectedCar,
                                                            name: car.name,
                                                            id: car.id,
                                                        });
                                                        await fetchTrims(
                                                            car.id,
                                                            car.make_id,
                                                        );
                                                    }}
                                                >
                                                    {`${car.name}`}
                                                </SelectItem>
                                            ),
                                        )}
                                    </Select>
                                )}
                            </div>
                            <div>
                                {selectedCar.name && (
                                    <Select
                                        label='Trims'
                                        name='trims'
                                        id='trims'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900'
                                        placeholder='Any'
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                    >
                                        {filteredModels.map((car: Car) => (
                                            <SelectItem
                                                key={car.id}
                                                value={car.name}
                                            >
                                                {`${car.name}`}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                            </div>
                        </div>
                    </FilterComponent>
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
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'bodies')}
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
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'fuel-type')}
                    >
                        <div className='dropdown-container'>
                            {fuelTypes.map((item: string, index: number) => (
                                <div key={index}>
                                    <CheckboxInput
                                        filterName={
                                            item.charAt(0).toUpperCase() +
                                            item.slice(1)
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
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'interior-color')}
                    >
                        <ColorFilter colors={interiorColors} />
                    </FilterComponent>

                    <FilterComponent
                        filterName='Exterior Color'
                        href='#exterior-color'
                        id='exterior-color'
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'exterior-color')}
                    >
                        <ColorFilter colors={exteriorColors} />
                    </FilterComponent>
                    <FilterComponent
                        filterName='Cylinders'
                        href='#cylinders'
                        id='cylinders'
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'cylinders')}
                    >
                        <div className='dropdown-container '>
                            {cylinders.map((item: string, index: number) => (
                                <div key={index}>
                                    <CheckboxInput
                                        filterName={`${item} cylinders`}
                                        id={`cyl-${index + 1}`}
                                        onChange={() => {}}
                                    />
                                </div>
                            ))}
                        </div>
                    </FilterComponent>
                </>
            )}
        </div>
    );
}

export default DesktopFilterDropdown;
