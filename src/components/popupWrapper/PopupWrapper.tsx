import React from 'react';
import style from './popupWrapper.module.scss';

export default function PopupWrapper() {
    return (
        <div className={style['popupWrapper']}>
            <div>This is popup lore</div>
        </div>
    );
}
