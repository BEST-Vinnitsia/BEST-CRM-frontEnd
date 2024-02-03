import React from 'react';
import style from './tab.module.scss';
import { joinStyle } from '../../../utils';

interface IProps {
    elementRef?: React.LegacyRef<HTMLButtonElement>;
    title: string;
    label: string;
    status?: boolean;
    color?: 'white' | 'green' | 'yellow' | 'red';
    onClick?: () => void;
}

export default function Tab({ elementRef, label, title, status = false, color = 'white', onClick }: IProps) {
    return (
        <button
            ref={elementRef}
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
