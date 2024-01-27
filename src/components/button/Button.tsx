import React from 'react';
import style from './button.module.scss';

interface IProps {
    title: string;
    svg?: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ title, onClick, svg }: IProps) {
    return (
        <button className={style['button']} onClick={onClick}>
            <span className={style['button__title']}>{title}</span>

            {svg && <span className={style['button__svg']}>{svg}</span>}
        </button>
    );
}
