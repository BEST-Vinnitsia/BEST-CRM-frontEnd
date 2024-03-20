import React from 'react';
import style from './popupContent.module.scss';

interface IProps {
    children: React.ReactNode;
}

export default function PopupContent({children}: IProps) {
    return (
        <div className={style['popupContent']}>
            {children}
        </div>
    );
}