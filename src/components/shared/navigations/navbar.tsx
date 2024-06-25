import IconLucide from '@/components/icon/lucide-icon';
import {
    NavbarContent,
    NavbarItem,
    Navbar,
    NavbarMenuToggle,
    NavbarBrand,
    Button,
    NavbarMenu,
    NavbarMenuItem,
} from '@nextui-org/react';
import { CircleUser, Icon, Wallet } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const components = [
        'Used Cars',
        'New Cars',
        'Private Seller Cars',
        'Sell My Car',
        'Instant Cash Offer',
        'Car Research & Tools',
        'Find Local Dealers',
    ];
    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            className=' flex flex-row justify-center bg-blue-900 text-white font-semibold'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className='md:hidden'
                />
                <NavbarBrand>
                    <p className='font-bold text-inherit'>Autotrader</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className='  bg-blue-900 '>
                <div className='hidden md:flex space-x-4'>
                    {components.map((item, index) => (
                        <>
                            <NavbarItem
                                key={index}
                                className='hover:cursor-pointer'>
                                {item}
                            </NavbarItem>
                        </>
                    ))}
                </div>
            </NavbarContent>

            <NavbarMenu>
                {components.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? 'primary'
                                    : index === components.length - 1
                                    ? 'danger'
                                    : 'foreground'
                            }
                            className='w-full'
                            href='#'>
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default NavbarComponent;
