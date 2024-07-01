import { FilterInput } from '@components/shared/filters/filter-component';
import React, { ChangeEventHandler } from 'react';

export function TextInput({
    filterName,
    value,
    placeholder,
    id,
    onChange,
    className,
}: {
    filterName: string;
    value: string | number;
    placeholder: string;
    id: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
}) {
    return (
        <FilterInput
            type='text'
            filterName={filterName}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
        />
    );
}

export function CheckboxInput({
    filterName,
    value,
    placeholder,
    id,
    onChange,
    className,
}: {
    filterName: string;
    value?: string | number;
    placeholder?: string;
    id: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
}) {
    return (
        <FilterInput
            type='checkbox'
            filterName={filterName}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
        />
    );
}
