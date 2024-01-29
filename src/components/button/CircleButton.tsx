import React from 'react';
import style from './circleButton.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    svg: React.ReactNode;
    onClick?: () => void;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    size?: 'small' | 'medium' | 'large';
}

export default function CircleButton({ svg, elementRef, onClick, size = 'medium' }: IProps) {
    return (
        <button
            ref={elementRef}
            className={joinStyle(style['circleButton'], style[`circleButton--${size}`])}
            onClick={onClick}
        >
            <span className={style['circleButton__svg']}>{svg}</span>
        </button>
    );
}
