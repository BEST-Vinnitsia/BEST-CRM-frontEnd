import React from 'react';
import style from './title.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    title: string;
    size?: '14' | '16' | '18' | '20' | '24' | '32' | '40' | '48';
    color?: 'white' | 'whiteGray' | 'blue' | 'green';
}

export default function Title({ title, size = '24', color = 'white' }: IProps) {
    return <h1 className={joinStyle(style['title'], style[`title--color-${color}`], style[`title--size-${size}`])}>{title}</h1>;
}
