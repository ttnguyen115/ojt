import { ntc } from '@utils/ntc';
import React, { ChangeEventHandler, MouseEvent, ReactNode } from 'react';

export function ColorFilter({ colors }: { colors: string[] }) {
    return (
        <div className='grid grid-cols-3 container h-40 w-full overflow-y-scroll gap-y-2 gap-x-5 my-4'>
            {colors.map((color: string, index: number) => (
                <div className='flex flex-col items-center'>
                    <div
                        key={color}
                        className=' border-2 border-gray-200 w-10 h-10 rounded-full'
                        style={{
                            backgroundColor: `#${color}`,
                        }}
                    ></div>
                    <div className='text-center'>{ntc.name(color)[1]}</div>
                </div>
            ))}
        </div>
    );
}
export function FilterInput({
    filterName,
    type,
    value,
    placeholder,
    id,
    onChange,
    className,
}: {
    filterName: string;
    type: string;
    value?: string | number;
    placeholder?: string;
    id: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
}) {
    return (
        <>
            <div className={`flex ${className}`}>
                <input
                    pattern={type === 'text' ? '[0-9]*' : undefined}
                    type={type}
                    placeholder={placeholder}
                    className={id === 'mileage' ? 'w-3/4' : 'mr-2'}
                    id={placeholder && `${placeholder.toLowerCase()}-${id}`}
                    value={value}
                    onChange={onChange}
                />
                <label
                    htmlFor={
                        placeholder &&
                        `${placeholder.toLowerCase()}-${filterName.toLowerCase()}`
                    }
                    className='text-gray-400 font-semibold'
                >
                    {filterName}
                </label>
            </div>
        </>
    );
}

function FilterComponent({
    filterName,
    href,
    children,
    id,
    onClick,
}: {
    filterName: string;
    href?: string;
    children: ReactNode;
    id: string;
    onClick?: MouseEvent<HTMLAnchorElement, MouseEvent>;
}) {
    return (
        <div className='divider'>
            <details id={id}>
                <summary>
                    {href ? (
                        <a
                            href={href}
                            onClick={(e) => onClick(e)}
                        >
                            <b>{filterName}</b>
                        </a>
                    ) : (
                        <b>{filterName}</b>
                    )}
                </summary>
                {children}
            </details>
        </div>
    );
}

export default FilterComponent;
