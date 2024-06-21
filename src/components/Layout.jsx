import { useEffect, useMemo, useState } from 'react';
import Footer from './footer';
import Navbar from './shared/navigations/navbar';
import SearchBar from './shared/searchbar/search-bar';
import CompareModal from './modals/compare-modal';
import { useDispatch, useSelector } from 'react-redux';
import duckCreator from '@/ducks/duck-creator';

const Layout = ({ children }) => {
    const { showMobile } = useSelector(duckCreator.selectors.returnIsMobile);
    console.log(showMobile);
    const [isMobile, setIsMobile] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const dispatch = useDispatch();
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        dispatch(duckCreator.creators.setShowMobile(isMobile));
    }, [isMobile]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div
                className={`fixed top-0 left-0 w-full transition-transform duration-300 bg-white ${
                    showSearchBar ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <SearchBar />
                <CompareModal />
            </div>
            <div className=' top-0 w-full'></div>
            <div className='flex-grow flex justify-center mt-6 mb-10'>
                <div className='w-11/12 '>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
