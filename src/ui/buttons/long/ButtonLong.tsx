import React from 'react';
import style from './buttonLong.module.scss';
import { js } from '../../../helpers';

interface IProps {
    title?: string;
    onClick?: () => void;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    status?: 'active' | 'disable' | 'loading' | 'default';
}

export default function ButtonLong({ title = '', onClick, elementRef, status = 'default' }: IProps) {
    return (
        <button
            ref={elementRef} //
            onClick={onClick}
            className={js(style['buttonLong'], style[`buttonLong--${status}`])}
        >
            <span className={style['buttonLong__bg']}>
                <span className={style['buttonLong__bg-itemBlue']} />
                <span className={style['buttonLong__bg-itemGreen']} />

                <span className={style['buttonLong__bg-blur']} />
            </span>

            <span className={style['buttonLong__title']}>{title}</span>
        </button>
    );
}
