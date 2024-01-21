import React from 'react';
import style from './menuButton.module.scss';

interface IProps {
    title: string;
    color?: 'red';
    onClick?: () => void;
}

export default function MenuButton({ title, color, onClick }: IProps) {
    return (
        <button className={style['menuButton']} onClick={onClick}>
            <span className={style['menuButton__title']} data-color={color}>
                {title}
            </span>
        </button>
    );
}
