import React from 'react';
import style from './button.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    title: string;
    svg?: React.ReactNode;
    onClick?: () => void;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    size?: 'small' | 'medium' | 'large';
    svgPosition?: 'right' | 'left';
}

export default function Button({
    title = '',
    onClick,
    svg,
    elementRef,
    size = 'medium',
    svgPosition = 'right',
}: IProps) {
    return (
        <button ref={elementRef} className={joinStyle(style['button'], style[`button--${size}`])} onClick={onClick}>
            {svg && svgPosition === 'left' && <span className={style['button__svg']}>{svg}</span>}

            <span className={style['button__title']}>{title}</span>

            {svg && svgPosition === 'right' && <span className={style['button__svg']}>{svg}</span>}
        </button>
    );
}
