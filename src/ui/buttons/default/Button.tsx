import React from 'react';
import style from './button.module.scss';
import { js } from '../../../helpers';

interface IProps {
    title?: string;
    svg?: React.ReactNode;
    onClick?: () => void;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    size?: 'small' | 'medium' | 'large';
    svgPosition?: 'right' | 'left';
    color?: 'default' | 'green' | 'red';
}

export default function Button({
    title = '',
    onClick,
    svg,
    elementRef,
    size = 'medium',
    svgPosition = 'right',
    color = 'default',
}: IProps) {
    return (
        <button
            ref={elementRef}
            onClick={onClick}
            className={js(style['button'], style[`button--size-${size}`], style[`button--color-${color}`])}
        >
            {svg && svgPosition === 'left' && <span className={style['button__svg']}>{svg}</span>}

            <span className={style['button__title']}>{title}</span>

            {svg && svgPosition === 'right' && <span className={style['button__svg']}>{svg}</span>}
        </button>
    );
}
