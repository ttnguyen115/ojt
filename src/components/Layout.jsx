import Footer from './footer';
import Navbar from './shared/navigations/navbar';

const Layout = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-grow flex justify-center mt-6 mb-10'>
                <div className='sm:w-11/12 md:w-4/5 '>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
