import React from 'react';
import style from './card.module.scss';
import { Text } from '../index';
import { joinStyle } from '../../utils';

interface IProps {
    title: string;
    subtitle?: string;
    img?: string;
    onClick?: () => void;
}

export default function Card({ title, subtitle, img, onClick }: IProps) {
    return (
        <div className={onClick ? joinStyle(style['card'], style['card--hover']) : style['card']} onClick={onClick}>
            <img className={style['card__img']} src={img} alt="" />

            <div className={style['card__blur']} />

            <div className={style['card__textBlock']}>
                <Text text={title} transform={'capitalize'} size={'20'} />

                {subtitle && (
                    <Text text={subtitle} fontFamily={'mono'} color={'gray'} transform={'uppercase'} size={'16'} />
                )}
            </div>
        </div>
    );
}
