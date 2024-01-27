import React from 'react';
import style from './label.module.scss';
import { joinStyle } from '../../../utils/joinClassName';

interface IProps {
    title: string;
    color?: 'white' | 'green' | 'yellow' | 'red';
}

export default function Label({ title, color = 'green' }: IProps) {
    return <span className={joinStyle(style['status__text'], style[`status__text--${color}`])}>{title}</span>;
}
