import React from 'react';
import style from './title.module.scss';
import { js } from '../../../helpers';

interface IProps {
    title: string;
    size?: '14' | '16' | '18' | '20' | '24' | '32' | '40' | '48';
    color?: 'white' | 'whiteGray' | 'blue' | 'green' | 'red';
    position?: 'start' | 'center' | 'end';
    p?: string;
}

export default function Title({ title, size = '24', color = 'white', position = 'start', p }: IProps) {
    return (
        <div
            className={js(
                style['title-container'], //
                style[`title-container--position-${position}`],
            )}
            style={{ padding: p }}
        >
            <h2
                className={js(
                    style['title'], //
                    style[`title--color-${color}`],
                    style[`title--size-${size}`],
                )}
            >
                {title}
            </h2>
        </div>
    );
}
