import React from 'react';

function MobileFilterModal({ filterModalOpen }: { filterModalOpen: boolean }) {
    return (
        <div
            className={`w-full h-full fixed top-0 left-0 transition-transform duration-300 ${
                filterModalOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            MobileFilterModal
        </div>
    );
}

export default MobileFilterModal;
