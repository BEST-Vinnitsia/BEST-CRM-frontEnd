import React from 'react';
import style from './title.module.scss';
import { js } from '../../../helpers';

interface IProps {
    title: string;
    size?: '14' | '16' | '18' | '20' | '24' | '32' | '40' | '48';
    color?: 'white' | 'whiteGray' | 'blue' | 'green' | 'red';
    position?: 'start' | 'center' | 'end';
}

export default function Title({ title, size = '24', color = 'white', position = 'start' }: IProps) {
    return (
        <h2
            className={js(
                style['title'], //
                style[`title--color-${color}`],
                style[`title--size-${size}`],
                style[`title--position-${position}`],
            )}
        >
            {title}
        </h2>
    );
}
