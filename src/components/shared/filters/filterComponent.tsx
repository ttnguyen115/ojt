//utils
import { ntc } from '@utils/ntc';
import React, { ChangeEventHandler, MouseEvent, ReactNode } from 'react';

function handleInputPattern(inputType: string) {
    return inputType === 'text' ? '[0-9]*' : '';
}
function returnId(id: string, title: string) {
    return `${title.toLowerCase()}-${id}`;
}

function splitColorName(color: string) {
    if (color.includes('Black' || 'Brown' || 'White')) {
        return 'Black' || 'Brown' || 'White';
    }
    return color.split(' ')[1];
}

export function ColorFilter({ colors }: { colors: string[] }) {
    return (
        <div className='grid grid-cols-3 container h-40 w-full overflow-y-scroll gap-y-2 gap-x-5 my-4'>
            {colors.map((color: any) => (
                <div
                    className='flex flex-col items-center'
                    key={color.name}
                >
                    <div
                        className=' border-2 border-gray-200 w-10 h-10 rounded-full'
                        style={{ backgroundColor: `rgb(${color.rgb})` }}
                    />
                    <div className='text-center'>
                        {splitColorName(color.name)}
                    </div>
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
    inputStyle,
}: {
    filterName: string;
    type: string;
    value?: string | number;
    placeholder?: string;
    id: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    inputStyle?: string;
}) {
    return (
        <div className={`flex ${className}`}>
            <input
                pattern={handleInputPattern(type)}
                type={type}
                placeholder={placeholder}
                className={inputStyle}
                id={placeholder && returnId(id, placeholder)}
                value={value}
                onChange={onChange}
            />
            <label
                htmlFor={placeholder && returnId(id, placeholder)}
                className='text-gray-400 font-semibold'
            >
                {filterName}
            </label>
        </div>
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
    onClick?;
}) {
    return (
        <div className='divider'>
            <details id={id}>
                <summary>
                    {href ? (
                        <a
                            href={href}
                            onClick={onClick}
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
