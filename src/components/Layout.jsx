//components
import Footer from './footer';
import NavbarComponent from './shared/navigations/navbar';
// import SearchBar from './shared/searchbar/search-bar';
// import CompareModal from './modals/compare-modal';
// import { useDispatch, useSelector } from 'react-redux';
// import duckCreator from '@/ducks/duck-creator';

const Layout = ({ children }) => {
    // const { showMobile } = useSelector(duckCreator.selectors.returnIsMobile);
    // const [showSearchBar, setShowSearchBar] = useState(false);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 0) {
    //             setShowSearchBar(true);
    //         } else {
    //             setShowSearchBar(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className='flex flex-col min-h-screen min-w-screen content-center'>
            <NavbarComponent />
            {/* <div
                className={`fixed top-0 left-0 w-full transition-transform duration-300 bg-white ${
                    showSearchBar ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <SearchBar />
                <CompareModal />
            </div> */}
            <div className=' top-0'></div>
            <div className='flex-row flex justify-center content-center mt-6 mb-10'>
                <div className='w-4/5 '>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
