//react
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

//components
import { CheckboxInput, TextInput } from '@components/inputs/input';
import FilterComponent, {
    ColorFilter,
} from '@components/shared/filters/filterComponent';
import { Select, SelectItem } from '@nextui-org/react';

//types
import { Make } from '@contracts/types/make';
import { Car } from '@contracts/types/car';
import { Filter } from '@contracts/index';

//redux-selectors
import {
    getCars,
    getExteriorColors,
    getFilters,
    getInteriorColors,
    getMakes,
} from '@redux/selectors';

//utils
import getMakeFromId from '@utils/makeUtils/getMakeFromId';
import { filterCars, filterTrims, getMakeCarsNumber } from '@utils/carUtils';

//hooks
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import duckCreator from '@ducks/duckCreator';

function DesktopFilterDropdown() {
    const filters = getFilters();
    const dispatch = useDispatch();

    const cars = getCars();
    const makes = getMakes();
    const interiorColors = getInteriorColors();

    const exteriorColors = getExteriorColors();

    const [mileage, setMileage] = useState([0, 0]);
    const [year, setYear] = useState([0, 0]);
    const [selectedCar, setSelectedCar] = useState<Car>({} as Car);

    const [loading, setLoading] = useState(true);
    const [filteredModels, setFilteredModels] = useState<Car[]>(cars as Car[]);
    const [trims, setTrims] = useState<Car[]>([] as Car[]);

    const [filter, setFilter] = useState<Filter>(filters);
    const [urlParams, setUrlParams] = useState<
        { key: string; value: string }[] | null
    >(null);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    function pushUrlParams(key: string, value: string | number) {
        const newQuery = { ...router.query, [key]: value.toString() };

        router.push({
            pathname: pathname,
            query: newQuery,
        });
    }

    const getParamValueFromState = (key: string) => {
        const param = searchParams?.get(key);
        return param;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.currentTarget;
        const splitId = id.split('-');
        if (splitId[0] === 'min') {
            if (splitId[1] === 'mileage') {
                setMileage([parseInt(value), mileage[1]]);
            } else {
                setYear([parseInt(value), year[1]]);
            }
        } else if (splitId[0] === 'max') {
            if (splitId[1] === 'mileage') {
                setMileage([mileage[0], parseInt(value)]);
            } else {
                setYear([year[0], parseInt(value)]);
            }
        }
        pushUrlParams(`${splitId[0]}_${splitId[1]}`, parseInt(value) || 0);
    };

    const handleAnchorTagClick = (
        e: MouseEvent<HTMLAnchorElement, MouseEvent>,
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
                getMakeCarsNumber(makes, cars);
                setLoading(false);
            }
        }
    };

    const filterModels = (makeName: string) => {
        setTrims([]);
        const filteredModels = filterCars(cars, makeName);
        setFilteredModels(filteredModels);
    };

    useEffect(() => {
        getMakeCars();
    }, []);

    useEffect(() => {
        setSelectedCar({
            ...selectedCar,
            make_name: router.query.make?.toString() || '',
            name: router.query.model?.toString() || '',
        });
        filterModels(router.query.make?.toString() || '');
    }, [router.query]);

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
                                inputStyle='w-4/5'
                                filterName='Min'
                                id='year'
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                placeholder='Min'
                                value={year[0] || 0}
                                className='flex-col-reverse'
                            />
                            <TextInput
                                inputStyle='w-4/5'
                                filterName='Max'
                                id='year'
                                onChange={(e) => handleInputChange(e)}
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
                                {typeof selectedCar.name !== 'undefined'
                                    ? `${selectedCar.make_name} ${selectedCar.name}`
                                    : 'Vehicle 1'}
                            </p>
                            <>
                                {makes.length > 0 && (
                                    <Select
                                        label='Select Make'
                                        name='makes'
                                        id='makes'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900'
                                        placeholder={
                                            router.query.make?.toString() ||
                                            'Any Make'
                                        }
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                        items={makes}
                                    >
                                        {(make) => (
                                            <SelectItem
                                                isDisabled={
                                                    make.numberOfCars === 0
                                                }
                                                key={make.id}
                                                value={make.id}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    pushUrlParams(
                                                        'make',
                                                        make.name,
                                                    );
                                                    // pushUrlParams('model', '');  
                                                }}
                                                className='font-bold'
                                            >
                                                {`${make.name} (${make.numberOfCars})`}
                                            </SelectItem>
                                        )}
                                    </Select>
                                )}
                            </>
                            <>
                                {selectedCar.make_name && (
                                    <Select
                                        label='Models'
                                        name='models'
                                        id='models'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900'
                                        placeholder={
                                            router.query.model?.toString() ||
                                            'Any'
                                        }
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                        items={filteredModels}
                                    >
                                        {(car: Car) => (
                                            <SelectItem
                                                key={car.id}
                                                value={car.name}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    pushUrlParams(
                                                        'model',
                                                        car.name,
                                                    );
                                                }}
                                            >
                                                {`${car.name}`}
                                            </SelectItem>
                                        )}
                                    </Select>
                                )}
                            </>
                            <>
                                {trims.length > 0 && (
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
                                        {trims.flatMap((car) =>
                                            car.trims
                                                ? car.trims.map((trim) => (
                                                      <SelectItem
                                                          key={trim.id}
                                                          value={trim.id}
                                                          onClick={() => {
                                                              setSelectedCar({
                                                                  ...selectedCar,
                                                                  selectedTrim:
                                                                      trim.name,
                                                              });
                                                              pushUrlParams(
                                                                  'trim',
                                                                  trim.name,
                                                              );
                                                          }}
                                                      >
                                                          {trim.name}
                                                      </SelectItem>
                                                  ))
                                                : [],
                                        )}
                                    </Select>
                                )}
                            </>
                        </div>
                    </FilterComponent>
                    <FilterComponent
                        filterName='Mileage'
                        id='mileage'
                    >
                        <div className='flex flex-row justify-between'>
                            <TextInput
                                inputStyle='w-4/5'
                                filterName='Min'
                                id='mileage'
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Min'
                                value={mileage[0] || 0}
                                className='flex-col-reverse'
                            />
                            <TextInput
                                inputStyle='w-4/5'
                                filterName='Max'
                                id='mileage'
                                onChange={(e) => handleInputChange(e)}
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
                            {filters.bodiestype.map(
                                (item: any, index: number) => (
                                    <div key={index}>
                                        <CheckboxInput
                                            inputStyle='mr-2'
                                            filterName={item.type}
                                            id={`body-${index + 1}`}
                                            onChange={() => {}}
                                            // className='flex-row items-start'
                                        />
                                    </div>
                                ),
                            )}
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
                            {filters.enginesType.map(
                                (item: any, index: number) => (
                                    <div key={index}>
                                        <CheckboxInput
                                            inputStyle='mr-2'
                                            filterName={
                                                item.engine_type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                item.engine_type.slice(1)
                                            }
                                            id={`fuel-${index + 1}`}
                                            onChange={() => {}}
                                        />
                                    </div>
                                ),
                            )}
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
                    {/* <FilterComponent
                        filterName='Cylinders'
                        href='#cylinders'
                        id='cylinders'
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'cylinders')}
                    >
                        <div className='dropdown-container '>
                            {filters.enginescylinders.map(
                                (item: number, index: number) => (
                                    <div key={index}>
                                        <CheckboxInput
                                            inputStyle='mr-2'
                                            filterName={`${item} cylinders`}
                                            id={`cyl-${index + 1}`}
                                            onChange={() => {}}
                                        />
                                    </div>
                                ),
                            )}
                        </div>
                    </FilterComponent> */}
                </>
            )}
        </div>
    );
}

export default DesktopFilterDropdown;
