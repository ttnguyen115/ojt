import DesktopFilterDropdown from '@/components/modals/desktop-filter-dropdown';
import MobileFilterModal from '@/components/modals/mobile-filter-modal';
import duckCreator from '@/ducks/duck-creator';
import React from 'react';
import { useSelector } from 'react-redux';

function CheckboxFilter() {
    const { showMobile } = useSelector(duckCreator.selectors.returnIsMobile);
    const { filters = [] } = useSelector(duckCreator.selectors.getAllFilters);

    return (
        <div className=''>
            {showMobile ? (
                <MobileFilterModal />
            ) : (
                <DesktopFilterDropdown components={filters} />
            )}
        </div>
    );
}

export default CheckboxFilter;
