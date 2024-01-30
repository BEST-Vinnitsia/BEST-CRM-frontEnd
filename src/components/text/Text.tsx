import React from 'react';
import style from './text.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    text: string;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'span-sm';
    space?: 'wrap' | 'nowrap';
    width?: 'lite' | 'normal' | 'bold';
    color?: 'white' | 'gray';
    fontFamily?: 'pro' | 'mono';
    horizon?: 'start' | 'center' | 'end';
}

export default function Text({
    text,
    color = 'white',
    type = 'span',
    width = 'normal',
    space = 'nowrap',
    fontFamily = 'pro',
    horizon = 'start',
}: IProps) {
    // h1
    if (type === 'h1') {
        return (
            <h1
                className={joinStyle(
                    style[`${type}`],
                    style[`font--width-${width}`],
                    style[`font--color-${color}`],
                    style[`font--family-${fontFamily}`],
                    style[`font--space-${space}`],
                    style[`font--horizon-${horizon}`],
                )}
            >
                {text}
            </h1>
        );
    }

    // h2
    if (type === 'h2') {
        return (
            <h2
                className={joinStyle(
                    style[`${type}`],
                    style[`font--width-${width}`],
                    style[`font--color-${color}`],
                    style[`font--family-${fontFamily}`],
                    style[`font--space-${space}`],
                    style[`font--horizon-${horizon}`],
                )}
            >
                {text}
            </h2>
        );
    }

    // h3
    if (type === 'h3') {
        return (
            <h3
                className={joinStyle(
                    style[`${type}`],
                    style[`font--width-${width}`],
                    style[`font--color-${color}`],
                    style[`font--family-${fontFamily}`],
                    style[`font--space-${space}`],
                    style[`font--horizon-${horizon}`],
                )}
            >
                {text}
            </h3>
        );
    }

    // h4
    if (type === 'h4') {
        return (
            <h4
                className={joinStyle(
                    style[`${type}`],
                    style[`font--width-${width}`],
                    style[`font--color-${color}`],
                    style[`font--family-${fontFamily}`],
                    style[`font--space-${space}`],
                    style[`font--horizon-${horizon}`],
                )}
            >
                {text}
            </h4>
        );
    }

    // h5
    if (type === 'h5') {
        return (
            <h5
                className={joinStyle(
                    style[`${type}`],
                    style[`font--width-${width}`],
                    style[`font--color-${color}`],
                    style[`font--family-${fontFamily}`],
                    style[`font--space-${space}`],
                    style[`font--horizon-${horizon}`],
                )}
            >
                {text}
            </h5>
        );
    }

    // h6
    if (type === 'h6') {
        return (
            <h6
                className={joinStyle(
                    style[`${type}`],
                    style[`font--width-${width}`],
                    style[`font--color-${color}`],
                    style[`font--family-${fontFamily}`],
                    style[`font--space-${space}`],
                    style[`font--horizon-${horizon}`],
                )}
            >
                {text}
            </h6>
        );
    }

    // span or span-sm
    return (
        <span
            className={joinStyle(
                style[`${type}`],
                style[`font--width-${width}`],
                style[`font--color-${color}`],
                style[`font--family-${fontFamily}`],
                style[`font--space-${space}`],
                style[`font--horizon-${horizon}`],
            )}
        >
            {text}
        </span>
    );
}
