import React from 'react';
import style from './menuButton.module.scss';
import { joinStyle } from '../../utils/joinClassName';

interface IProps {
    title: string;
    color?: 'red' | 'while';
    onClick?: () => void;
}

export default function MenuButton({ title, color = 'while', onClick }: IProps) {
    return (
        <button className={style['menuButton']} onClick={onClick}>
            <span className={joinStyle(style['menuButton__title'], style[`menuButton__title--${color}`])}>{title}</span>
        </button>
    );
}
