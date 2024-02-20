import React from 'react';
import style from './pageHeader.module.scss';

interface IProps {
    title: string;
    subtitle: string;
    img?: string;
}

export default function PageHeader({ title, subtitle, img }: IProps) {
    return (
        <div className={style['pageHeader']}>
            <div className={style['pageHeader__img']}>
                <img src={img} alt="" />
            </div>

            <div className={style['pageHeader__text']}>
                <h1 className={style['pageHeader__text-title']}>{title}</h1>
                <h2 className={style['pageHeader__text-subtitle']}>{subtitle}</h2>
            </div>
        </div>
    );
}
