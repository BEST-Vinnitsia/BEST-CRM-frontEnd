import React from 'react';
import style from './popupButtonContainer.module.scss';

interface IProps {
    children?: React.ReactNode;
}

export default function PopupButtonContainer({ children }: IProps) {
    return <div className={style['popupButtonContainer']}>{children}</div>;
}
