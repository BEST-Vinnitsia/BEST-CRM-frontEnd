import React from 'react';
import style from './label.module.scss';
import { js } from '../../helpers';

interface IProps {
    title: string;
    color?: 'gray' | 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'pink';
    size?: 'medium' | 'large';
}

export default function Label({ title, size = 'medium', color = 'gray' }: IProps) {
    return (
        <div
            className={js(
                style['label'], //
                style[`label--size-${size}`],
                style[`label--color-${color}`],
            )}
        >
            <span className={style['label__text']}>{title}</span>
        </div>
    );
}
