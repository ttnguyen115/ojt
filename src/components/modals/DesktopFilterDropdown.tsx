//react
import React, {
    ChangeEvent,
    Fragment,
    MouseEvent,
    useEffect,
    useState,
} from 'react';

//components
import { CheckboxInput, TextInput } from '@components/inputs/input';
import FilterComponent, {
    ColorFilter,
} from '@components/shared/filters/filterComponent';
import { Select, SelectItem } from '@nextui-org/react';

//types
import { Car } from '@contracts/types/car';

//redux-selectors
import { getFilters } from '@redux/selectors';

//hooks
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

function DesktopFilterDropdown() {
    const filters = getFilters();

    const [mileage, setMileage] = useState([0, 0]);
    const [year, setYear] = useState([0, 0]);
    const [selectedCar, setSelectedCar] = useState<Car>({} as Car);

    const [filteredModels, setFilteredModels] = useState<Car[]>([]);
    const [trims, setTrims] = useState<Car[]>([]);

    const pathname = usePathname();
    const router = useRouter();

    function pushUrlParams(key: string, value: string | number) {
        const currentQuery = new URLSearchParams(
            router.query as Record<string, string>,
        );

        if (key === 'make' && router.query.model) {
            currentQuery.delete('model'); // Clear 'model' if 'make' is provided
        }

        if (key === 'body') {
            const existingValues = currentQuery.getAll(key);
            existingValues.push(value.toString());
            currentQuery.delete(key); // Clear all existing values
            existingValues.forEach((val) => currentQuery.append(key, val)); // Append all values
        } else {
            currentQuery.set(key, value.toString()); // Set or replace value for other keys
        }

        console.log('Final query string:', currentQuery.toString());

        router.push({
            pathname: pathname,
            query: currentQuery.toString(), // Converts URLSearchParams back to a query string
        });
    }

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
        setTimeout(() => {
            pushUrlParams(`${splitId[0]}_${splitId[1]}`, parseInt(value) || 0);
        }, 2000);
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

    const handleCheckboxChange = (
        e: ChangeEvent<HTMLInputElement>,
        name: string,
        item: string,
    ) => {
        const { id, checked } = e.target;
        const splitId = id.split('-');
        console.log(e.target.value, 'id', id);
        if (checked) {
            pushUrlParams(name, item);
        }
    };

    useEffect(() => {
        setSelectedCar({
            ...selectedCar,
            make_name: router.query.make?.toString() || '',
            name: router.query.model?.toString() || '',
        });
        setFilteredModels(filters.cars);
        setMileage([
            ...mileage,
            (mileage[0] = Number(router.query.min_mileage) || 0),
            (mileage[1] = Number(router.query.max_mileage) || 0),
        ]);
    }, [router.query, filters]);

    return (
        <div className='w-full h-full overflow-y-scroll'>
            {filters && (
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
                        <div
                            className='dropdown-container z-10'
                            suppressHydrationWarning
                        >
                            <p className='text-gray-400 font-semibold py-2'>
                                {typeof selectedCar.name !== 'undefined'
                                    ? `${selectedCar.make_name} ${selectedCar.name}`
                                    : 'Vehicle 1'}
                            </p>
                            <>
                                {filters.makes && filters.makes.length > 0 && (
                                    <Select
                                        label='Select Make'
                                        name='makes'
                                        id='makes'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900 z-10'
                                        placeholder={
                                            router.query.make?.toString() ||
                                            'Any Make'
                                        }
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                        items={filters.makes}
                                    >
                                        {(make) => (
                                            <SelectItem
                                                isDisabled={
                                                    make.numberOfCars === 0
                                                }
                                                key={make.id}
                                                value={make.id}
                                                onPress={() => {
                                                    pushUrlParams(
                                                        'make',
                                                        make.name,
                                                    );
                                                }}
                                                isSelected={
                                                    selectedCar.make_name ===
                                                    make.name
                                                }
                                                className='font-bold'
                                            >
                                                {`${make.name} (${make.numberOfCars})`}
                                            </SelectItem>
                                        )}
                                    </Select>
                                )}
                            </>
                            <>
                                {selectedCar.make_name && filteredModels && (
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
                                                onPress={() => {
                                                    pushUrlParams(
                                                        'model',
                                                        car.name,
                                                    );
                                                }}
                                                isSelected={
                                                    car.name ===
                                                    selectedCar.name
                                                }
                                            >
                                                {`${car.name}`}
                                            </SelectItem>
                                        )}
                                    </Select>
                                )}
                            </>
                            <>
                                {/* {trims.length > 0 && selectedCar.name && ( */}
                                <Select
                                    label='Trims'
                                    name='trims'
                                    id='trims'
                                    className='flex flex-row justify-between w-full p-2 content-center text-gray-900 '
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
                                                      onPress={() => {
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
                                {/* )} */}
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
                                placeholder={'Min'}
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
                            {filters.bodiesType &&
                                filters.bodiesType.map(
                                    (item: any, index: number) => (
                                        <Fragment key={index}>
                                            <CheckboxInput
                                                inputStyle='mr-2'
                                                filterName={item.type}
                                                id={`body-${index + 1}`}
                                                value={item.type}
                                                onChange={(e) => {
                                                    handleCheckboxChange(
                                                        e,
                                                        'body',
                                                        item.type,
                                                    );
                                                }}
                                            />
                                        </Fragment>
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
                            {filters.enginesType &&
                                filters.enginesType.map(
                                    (item: any, index: number) => (
                                        <Fragment key={index}>
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
                                        </Fragment>
                                    ),
                                )}
                        </div>
                    </FilterComponent>
                    {filters.interiorColors && (
                        <FilterComponent
                            filterName='Interior Color'
                            href='#interior-color'
                            id='interior-color'
                            onClick={(
                                e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                            ) => handleAnchorTagClick(e, 'interior-color')}
                        >
                            <ColorFilter colors={filters.interiorColors} />
                        </FilterComponent>
                    )}

                    {filters.exteriorColors && (
                        <FilterComponent
                            filterName='Exterior Color'
                            href='#exterior-color'
                            id='exterior-color'
                            onClick={(
                                e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                            ) => handleAnchorTagClick(e, 'exterior-color')}
                        >
                            <ColorFilter colors={filters.exteriorColors} />
                        </FilterComponent>
                    )}
                </>
            )}
        </div>
    );
}

export default DesktopFilterDropdown;
