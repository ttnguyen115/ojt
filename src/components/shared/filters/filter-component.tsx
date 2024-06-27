import { Filter } from '@contracts/types/filter';
import { handleInputChange } from '@utils/input-utils';
import React from 'react';

function FilterInput({ filterValues }: { filterValues: Filter }) {
    return (
        <>
            <div className='flex flex-col '>
                {filterValues.value.map((value, index) => (
                    <>
                        <label
                            htmlFor='min-mileage'
                            className='text-gray-400 font-semibold'
                        >
                            {filterValues.name}
                        </label>
                        <input
                            pattern='[^0-9.]'
                            type={filterValues.type}
                            placeholder='Min'
                            className='w-3/4 '
                            id={
                                filterValues.type === 'number'
                                    ? index === 0
                                        ? `min-${filterValues.name.toLowerCase()}:`
                                        : `max-${filterValues.name.toLowerCase()}`
                                    : ''
                            }
                            value={
                                filterValues.type === 'number'
                                    ? filterValues.value[index]
                                    : '' || 0
                            }
                            onChange={(e) => handleInputChange(e)}
                        />
                    </>
                ))}
            </div>
        </>
    );
}

function FilterComponent({
    filterName,
    filterValues,
}: {
    filterName: string;
    filterValues: Filter;
}) {
    return (
        <div className='divider'>
            <details id={filterName.toLowerCase()}>
                <summary>
                    <b>{filterName}</b>
                </summary>
                <FilterInput filterValues={filterValues} />
            </details>
        </div>
    );
}

export default FilterComponent;
