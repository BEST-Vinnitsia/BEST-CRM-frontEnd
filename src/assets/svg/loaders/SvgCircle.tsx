import React from 'react';
import style from './svgCircle.module.scss';

export default function SvgCircle() {
    return (
        <span className={style['svgCircle']}>
            <svg viewBox="22 22 44 44" className={style['svgCircle__svg']}>
                <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
            </svg>
        </span>
    );
}
