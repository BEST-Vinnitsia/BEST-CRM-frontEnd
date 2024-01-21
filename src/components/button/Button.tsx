import React from 'react';
import style from './button.module.scss';

interface IProps {
    title: string;
    svg: React.ReactNode;
    onClick?: () => void;
}

export default function Button(props: IProps) {
    return (
        <button className={style['button']} onClick={props.onClick}>
            <span className={style['button__title']}>{props.title}</span>
            <span className={style['button__svg']}>{props.svg}</span>
        </button>
    );
}
