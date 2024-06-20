import DesktopFilterDropdown from '@/components/modals/desktop-filter-dropdown';
import MobileFilterModal from '@/components/modals/mobile-filter-modal';
import duckCreator from '@/ducks/duck-creator';
import React from 'react';
import { useSelector } from 'react-redux';

function CheckboxFilter() {
    const { showMobile } = useSelector(duckCreator.selectors.returnIsMobile);
    const { filters = [] } = useSelector(duckCreator.selectors.getAllFilters);
    console.log(showMobile);

    return (
        <div className=''>
            {!showMobile ? (
                <DesktopFilterDropdown components={filters} />
            ) : (
                <MobileFilterModal filterModalOpen={false} />
            )}
        </div>
    );
}

export default CheckboxFilter;
