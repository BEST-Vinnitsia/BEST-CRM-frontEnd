import React from 'react';
import style from './headCell.module.scss';

interface IProps {
    text?: string;
}

export default function HeadCell({ text }: IProps) {
    if (!text) {
        return <th className={style['head-empty-cell']} />;
    }

    return <th className={style['head-cell']}>{text}</th>;
}
