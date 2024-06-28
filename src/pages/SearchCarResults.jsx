// helpers

// hooks

// components
import Link from 'next/link';
import CheckboxFilter from '@components/shared/filters/check-box-filter';
import CarHolder from '@components/shared/car-holder/car-holder';
import { mapDuckEggsToPage } from '@helpers/mapDuckEggsToPage';
import useCustomNavigation from '@hooks/useCustomNavigation';
const SearchCarResults = ({ title }) => {
    const navigateToPage = useCustomNavigation();

    const handleClick = () => {
        navigateToPage({ query: '123' });
    };

    return (
        <div className='flex flex-col items-start w-full'>
            <Link
                href={'/'}
                color='#1e3a8a'
            >
                {title}
            </Link>
            <div className='grid md:grid-cols-12 gap-x-4 gap-y-2 w-full'>
                <div className='sm:hidden lg:block lg:col-span-3 items-start border-2 border-gray-200 rounded-md h-fit overflow-y-scroll'>
                    <CheckboxFilter />
                </div>
                <div className='col-span-12 lg:col-span-9 w-full flex flex-col gap-4'>
                    {/* <SortAndCompare /> */}
                    <CarHolder />
                </div>
            </div>
        </div>
    );
};

SearchCarResults.getInitialProps = async (context) => {
    return { title: 'SearchCarResults' };
};

const { WrappedPage } = mapDuckEggsToPage(SearchCarResults, {
    // Only add reducers which are only used in this PageComponent
    // exampleDuckCreator had called API and wrapped as a global reducer
    reducers: [],
});

export default WrappedPage;
