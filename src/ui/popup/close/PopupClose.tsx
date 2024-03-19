import React from 'react';
import style from './popupClose.module.scss';
import { SvgClose } from '../../../assets/svg';

interface IProps {
    onClick?: () => void;
}

export default function PopupClose({ onClick }: IProps) {
    return (
        <button className={style['popupClose']} onClick={onClick}>
            <span className={style['popupClose-svg']}>
                <SvgClose />
            </span>
        </button>
    );
}
