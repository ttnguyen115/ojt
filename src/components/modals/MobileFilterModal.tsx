//react
import React from 'react';

//redux
import { useDispatch } from 'react-redux';

//duck
import duckCreator from '@ducks/duckCreator';

//redux-selectors
import { getShowMobileFilterModal } from '@redux/selectors';

//clsx
import clsx from 'clsx';

function MobileFilterModal() {
    const dispatch = useDispatch();
    const showMobileFilterModal = getShowMobileFilterModal();
    const handleFilterModal = (value: boolean) => {
        dispatch(duckCreator.creators.setShowMobileFilterModal(value));
    };
    return (
        <>
            <div onClick={() => handleFilterModal(true)}>Filter</div>
            <div
                className={clsx(
                    'w-full h-full bg-white fixed top-0 left-0 transition-transform duration-300 translate-x-full',
                    { 'translate-x-0': showMobileFilterModal },
                )}
            >
                Filter Modal
                <div onClick={() => handleFilterModal(false)}>Close</div>
            </div>
        </>
    );
}

export default MobileFilterModal;
