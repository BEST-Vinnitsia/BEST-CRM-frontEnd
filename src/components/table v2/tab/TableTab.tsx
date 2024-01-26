import React from 'react';
import style from './tableTab.module.scss';
import { joinStyle } from '../../../utils/joinClassName';

interface IProps {
    title: string;
    label: string;
    status?: boolean;
    color?: 'white' | 'green' | 'yellow' | 'red';
    onClick?: () => void;
}

export default function TableTab({ label, title, status = false, color = 'white', onClick }: IProps) {
    return (
        <button
            className={joinStyle(
                style['table__tab'], //
                style[`table__tab--${status ? 'active' : 'inactive'}`],
            )}
            onClick={onClick}
        >
            {title}
            <span
                className={joinStyle(
                    style['table__tab-label'], //
                    style[`table__tab-label--${color}--${status ? 'active' : 'inactive'}`],
                )}
            >
                {label}
            </span>
        </button>
    );
}
