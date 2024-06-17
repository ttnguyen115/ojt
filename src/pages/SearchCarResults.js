import { useSelector } from 'react-redux';

// helpers
import { mapDuckEggsToPage } from '@/helpers';

// ducks
import exampleDuckCreator from '@/ducks/exampleDuckCreator';

// hooks
import useCustomNavigation from '@/hooks/useCustomNavigation';


import CheckboxFilter from '@/components/shared/filters/check-box-filter';
import CarHolder from '@/components/shared/car-holder/car-holder';
import SortAndCompare from '@/components/shared/filters/car-sort-filter';
import Sort from '@/components/shared/filters/sort/sort';
import Wallet from '@/components/shared/wallet/wallet';
import SearchInput from '@/components/inputs/search-input';
import CompareModal from '@/components/modals/compare-modal';

const SearchCarResults = ({ title }) => {
    const navigateToPage = useCustomNavigation();

    const handleClick = () => {
        navigateToPage({ query: '123' });
    };

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='grid md:grid-cols-12 gap-x-4 gap-y-2 w-full'>
                <div className='col-span-12 border-gray-200 border-2 rounded-md     '>
                    <div>Text</div>
                    <div>Text</div>
                    <div className='border-gray-200 border-2 rounded-md flex flex-col lg:flex-row justify-between'>
                        <SearchInput />
                        <div>Chips filters</div>
                    </div>
                </div>
                <div className='col-span-12 items-center sm:flex flex-row md:hidden justify-around border-2 border-gray-200 rounded-md'>
                    <CheckboxFilter />
                    <Sort className='block md:hidden' />
                    <Wallet className='block md:hidden' />
                </div>
                <div className='sm:hidden md:block md:col-span-3 items-start border-2 border-gray-200 rounded-md h-1/2'>
                    <CheckboxFilter />
                </div>
                <div className='col-span-12 md:col-span-9 w-full flex flex-col gap-4'>
                    <SortAndCompare />
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
