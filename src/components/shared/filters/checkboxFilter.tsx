import React, { Fragment } from 'react';

//components
import DesktopFilterDropdown from '@components/modals/DesktopFilterDropdown';
import MobileFilterModal from '@components/modals/MobileFilterModal';

//redux-selectors
import { getShowMobile } from '@redux/selectors';

function CheckboxFilter() {
    const showMobile = getShowMobile();

    return (
        <Fragment>
            {showMobile ? <MobileFilterModal /> : <DesktopFilterDropdown />}
        </Fragment>
    );
}

export default CheckboxFilter;
