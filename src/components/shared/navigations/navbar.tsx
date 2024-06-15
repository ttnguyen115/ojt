import Link from 'next/link';
import React from 'react';

function Navbar() {
    return (
        <div className='w-screen h-14 border-gray-200 border-2 rounded-sm flex flex-row items-center justify-center'>
            <div className=' w-4/5 justify-center flex flex-row lg:mx-auto'>
                <p>This is the navbar</p>
            </div>
        </div>
    );
}

export default Navbar;
