import React from 'react';
import style from './menuText.module.scss';

interface IProps {
    title: string;
    subTitle: string;
}

export default function MenuText({ title, subTitle }: IProps) {
    return (
        <p className={style['menuText']}>
            <span className={style['menuText__title']}>{title}</span>
            <span className={style['menuText__subTitle']}>{subTitle}</span>
        </p>
    );
}
