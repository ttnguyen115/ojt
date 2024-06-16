import { useEffect, useState } from 'react';
import Footer from './footer';
import Navbar from './shared/navigations/navbar';
import SearchBar from './shared/searchbar/search-bar';

const Layout = ({ children }) => {
    const [showSearchBar, setShowSearchBar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowSearchBar(true);
            } else {
                setShowSearchBar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div
                className={`fixed top-0 left-0 w-full transition-transform duration-300 ${
                    showSearchBar ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <SearchBar />
            </div>
            <div className='flex-grow flex justify-center mt-6 mb-10'>
                <div className='sm:w-11/12 md:w-4/5 '>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
