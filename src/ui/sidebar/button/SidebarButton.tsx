import React from 'react';
import style from './sidebarButton.module.scss';
import { js } from '../../../helpers';

interface IProps {
    title: string;
    active?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

export default function SidebarButton({ title, children, onClick, active = false }: IProps) {
    return (
        <div className={js(style['button'], style[`button--${active ? 'active' : 'inactive'}`])} onClick={onClick}>
            <div className={style['button__bg']} />
            <div className={style['button__svg']}>{children}</div>
            <div className={style['button__title']}>{title}</div>
        </div>
    );
}
