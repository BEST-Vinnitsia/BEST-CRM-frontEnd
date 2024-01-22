import React from 'react';
import style from './longButton.module.scss';

interface IProps {
    title: string;
    onClick?: () => void;
    disable?: boolean;
}

export default function LongButton({ title, onClick, disable = false }: IProps) {
    return (
        <button className={style['longButton']} data-disable={disable ? '1' : '0'} onClick={onClick}>
            <span className={style['longButton__title']}>{title}</span>
        </button>
    );
}
