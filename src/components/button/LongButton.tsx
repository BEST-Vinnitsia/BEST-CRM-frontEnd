import React from 'react';
import style from './longButton.module.scss';
import { SvgCircle } from '../../assets/svg';
import { joinStyle } from '../../utils/';

interface IProps {
    title: string;
    onClick?: () => void;
    disable?: boolean;
    loading?: boolean;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    size?: 'small' | 'medium' | 'large';
    color?: 'light' | 'dark';
}

export default function LongButton({
    title,
    onClick,
    disable = false,
    loading = false,
    elementRef,
    size = 'medium',
    color = 'light',
}: IProps) {
    return (
        <button
            ref={elementRef}
            onClick={onClick}
            className={joinStyle(
                style['longButton'],
                //
                style[`longButton--size-${size}`],
                style[`longButton--color-${color}`],
                //
                style[`longButton--disable-${disable}`],
                style[`longButton--loading-${loading}`],
            )}
        >
            {loading ? (
                <span className={style['longButton__loading']}>
                    <SvgCircle />
                </span>
            ) : (
                <span className={style['longButton__title']}>{title}</span>
            )}
        </button>
    );
}
