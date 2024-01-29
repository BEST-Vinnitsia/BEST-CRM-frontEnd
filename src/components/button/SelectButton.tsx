import React from 'react';
import style from './selectButton.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    title: string;
    color?: 'red' | 'white';
    onClick?: () => void;
    svg?: React.ReactNode;
    svgPosition?: 'right' | 'left';
    active?: boolean;
}

export default function SelectButton({
    elementRef,
    title,
    color = 'white',
    onClick,
    svg,
    svgPosition = 'left',
    active = false,
}: IProps) {
    return (
        <button
            ref={elementRef}
            className={joinStyle(
                style['selectButton'],
                style[`selectButton--svg-${svgPosition}`],
                style[`selectButton--color-${color}`],
                style[`selectButton--active-${active}`],
            )}
            onClick={onClick}
        >
            {svg && svgPosition === 'left' && <span className={style['selectButton__svg']}>{svg}</span>}

            <span className={style['selectButton__title']}>{title}</span>

            {svg && svgPosition === 'right' && <span className={style['selectButton__svg']}>{svg}</span>}
        </button>
    );
}
