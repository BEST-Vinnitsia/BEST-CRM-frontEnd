import React from 'react';
import style from './buttonCircle.module.scss';
import { js } from '../../../helpers';

interface IProps {
    svg?: React.ReactNode;
    onClick?: () => void;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    size?: 'small' | 'medium' | 'large';
    color?: 'default' | 'transparent';
}

export default function ButtonCircle({ onClick, svg, elementRef, size = 'medium', color = 'default' }: IProps) {
    return (
        <button
            ref={elementRef} //
            onClick={onClick}
            className={js(
                style['buttonCircle'], //
                style[`buttonCircle--size-${size}`],
                style[`buttonCircle--color-${color}`],
            )}
        >
            <div className={style['buttonCircle__inner']}>
                <span className={style['buttonCircle__inner-svg']}>{svg}</span>
            </div>
        </button>
    );
}
