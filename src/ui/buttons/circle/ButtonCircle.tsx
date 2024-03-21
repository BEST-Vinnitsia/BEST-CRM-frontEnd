import React from 'react';
import style from './buttonCircle.module.scss';
import { js } from '../../../helpers';

interface IProps {
    svg?: React.ReactNode;
    onClick?: () => void;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    size?: 'small' | 'medium' | 'large';
}

export default function ButtonCircle({ onClick, svg, elementRef, size = 'medium' }: IProps) {
    return (
        <button
            ref={elementRef} //
            onClick={onClick}
            className={js(style['buttonCircle'], style[`buttonCircle--size-${size}`])}
        >
            <div className={style['buttonCircle__inner']}>
                <span className={style['buttonCircle__inner-svg']}>{svg}</span>
            </div>
        </button>
    );
}
