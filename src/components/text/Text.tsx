import React from 'react';
import style from './text.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    text: string;
    size?: '14' | '16' | '18' | '20' | '24' | '30' | '34' | '16--comp';
    space?: 'wrap' | 'nowrap';
    width?: 'lite' | 'normal' | 'bold';
    color?: 'white' | 'gray';
    fontFamily?: 'pro' | 'mono';
    horizon?: 'start' | 'center' | 'end';
    transform?: 'default' | 'capitalize' | 'uppercase' | 'lowercase';
}

export default function Text({
    text,
    color = 'white',
    size = '16',
    width = 'normal',
    space = 'wrap',
    fontFamily = 'pro',
    horizon = 'start',
    transform = 'default',
}: IProps) {
    return (
        <span
            className={joinStyle(
                style[`p${size}`],
                style[`font--width-${width}`],
                style[`font--color-${color}`],
                style[`font--family-${fontFamily}`],
                style[`font--space-${space}`],
                style[`font--horizon-${horizon}`],
                style[`font--transform-${transform}`],
            )}
        >
            {text}
        </span>
    );
}
