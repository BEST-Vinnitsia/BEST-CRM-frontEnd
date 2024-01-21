import React from 'react';
import style from './popupContainer.module.scss';
import { createPortal } from 'react-dom';

interface IProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
}

const portal = document.getElementById('portal-popup');

export default function PopupContainer({ children, onClose, isOpen }: IProps) {
    if (!portal) return <></>;
    if (!isOpen) return <></>;

    return createPortal(
        <div className={style['popupContainer']}>
            <div className={style['popupContainer__content']}>{children}</div>
            <div className={style['popupContainer__bg']} onClick={onClose} />
        </div>,
        portal,
    );
}
