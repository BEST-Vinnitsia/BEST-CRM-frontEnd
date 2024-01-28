import React from 'react';
import style from './text.module.scss';
import { joinStyle } from '../../../utils/';

interface IProps {
    text: string;
    subtext?: string;
    format?: 'cascade' | 'phone' | 'default';
    maxSize?: string;
    wrap?: boolean;
}

export default function Text({ text, subtext, format = 'default', maxSize, wrap = false }: IProps) {
    return (
        <td className={style['table__body-cell']}>
            {format === 'default' && (
                <span
                    className={joinStyle(style['table__text'], style['table__text--wrap'])}
                    style={{ maxWidth: maxSize ? maxSize : 'none' }}
                >
                    {text}
                </span>
            )}

            {format === 'cascade' && (
                <span
                    className={joinStyle(style['table__text'], style['table__text--cascade'])}
                    style={{ maxWidth: maxSize ? maxSize : 'none' }}
                >
                    <span className={style['table__text-cascade-text']}>{text}</span>
                    <span className={style['table__text-cascade-subtext']}>{subtext}</span>
                </span>
            )}

            {format === 'phone' && (
                <span className={style['table__text']} style={{ maxWidth: maxSize ? maxSize : 'none' }}>
                    {text.replace(/(.{3})(\d{3})(\d{2})(\d{2})(\d{3})/, '$1 ($2) $3-$4-$5')}
                </span>
            )}
        </td>
    );
}
