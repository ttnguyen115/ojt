import React from 'react';

//reudx
import { useSelector } from 'react-redux';

//duck
import duckCreator from '@ducks/duck-creator';

//components
import DesktopFilterDropdown from '@components/modals/desktop-filter-dropdown';
import MobileFilterModal from '@components/modals/mobile-filter-modal';

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
