import React, { useState } from 'react';
import { PopupContainer, PopupWrapper } from '../components';

export default function BoardPage() {
    const [popup, setPopup] = useState(false);

    return (
        <>
            <button onClick={() => setPopup((prev) => !prev)} className='p-4 bg-black rounded-lg m-4'>Open popup</button>

            <PopupContainer onClose={() => setPopup((prev) => !prev)} isOpen={popup}>
                <PopupWrapper></PopupWrapper>
            </PopupContainer>
        </>
    );
}
