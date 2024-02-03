import React from 'react';
import style from './label.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    title: string;
    color?: 'white' | 'green' | 'yellow' | 'red';
}

export default function Label({ title, color = 'green' }: IProps) {
    return <span className={joinStyle(style['label'], style[`label--${color}`])}>{title}</span>;
}
