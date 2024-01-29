import React from 'react';
import style from './button.module.scss';

interface IProps {
    title: string;
    svg?: React.ReactNode;
    onClick?: () => void;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    size?: 'small' | 'medium' | 'large';
    svgPosition?: 'right' | 'left' | 'center';
}

export default function Button({ title, onClick, svg, elementRef, size = 'medium', svgPosition = 'right' }: IProps) {
    return (
        <button ref={elementRef} className={style['button']} onClick={onClick}>
            <span className={style['button__title']}>{title}</span>

            {svg && <span className={style['button__svg']}>{svg}</span>}
        </button>
    );
}
