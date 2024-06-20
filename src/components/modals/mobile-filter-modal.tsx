import duckCreator from '@/ducks/duck-creator';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MobileFilterModal() {
    const dispatch = useDispatch();
    const { showMobileFilterModal } = useSelector(
        duckCreator.selectors.openMobileFilterModal,
    );

    useEffect(() => {
        console.log(showMobileFilterModal);
    }, [showMobileFilterModal]);

    return (
        <>
            <div
                className=''
                onClick={() =>
                    dispatch(
                        duckCreator.creators.setShowMobileFilterModal(true),
                    )
                }>
                Filter
            </div>
            <div
                className={`w-full h-full bg-white fixed top-0 left-0 transition-transform duration-300 ${
                    showMobileFilterModal
                        ? 'translate-x-0'
                        : '-translate-x-full'
                }`}>
                Filter Modal
                <div
                    onClick={() =>
                        dispatch(
                            duckCreator.creators.setShowMobileFilterModal(
                                false,
                            ),
                        )
                    }>
                    Close
                </div>
            </div>
        </>
    );
}

export default MobileFilterModal;
