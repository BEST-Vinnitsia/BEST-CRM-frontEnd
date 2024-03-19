import React from 'react';
import style from './popupBG.module.scss';

interface IProps {
    onClick?: () => void;
}

export default function PopupBg({ onClick }: IProps) {
    return <div className={style['popupBG']} onClick={onClick} />;
}
