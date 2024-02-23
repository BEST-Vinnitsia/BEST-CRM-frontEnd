import React from 'react';
import style from './smallCard.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    title: string;
    subtitle?: string;
    svg?: React.ReactNode;
    onClick?: () => void;
}

export default function SmallCard({ title, subtitle, svg, onClick }: IProps) {
    return (
        <div
            className={onClick ? joinStyle(style['smallCard'], style['smallCard--click']) : style['smallCard']}
            onClick={onClick}
        >
            <div className={style['smallCard__svg']}>{svg}</div>

            <div className={style['smallCard__textBlock']}>
                <span className={style['smallCard__textBlock-title']}>{title}</span>

                {subtitle && <span className={style['smallCard__textBlock-subtitle']}>{subtitle}</span>}
            </div>
        </div>
    );
}
