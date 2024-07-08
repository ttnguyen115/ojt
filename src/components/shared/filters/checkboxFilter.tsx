import React from 'react';

//components
import DesktopFilterDropdown from '@components/modals/DesktopFilterDropdown';
import MobileFilterModal from '@components/modals/MobileFilterModal';

//redux-selectors
import { getShowMobile } from '@redux/selectors';

function CheckboxFilter() {
    const showMobile = getShowMobile();

    return (
        <div>
            {showMobile ? <MobileFilterModal /> : <DesktopFilterDropdown />}
        </div>
    );
}

export default CheckboxFilter;
