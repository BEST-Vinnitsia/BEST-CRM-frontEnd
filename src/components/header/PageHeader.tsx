import React from 'react';
import style from './pageHeader.module.scss';
import { Text } from '../index';

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
                <Text text={title} size={'24'} width={'bold'} />
                <Text text={subtitle} color={'gray'} />
            </div>
        </div>
    );
}
