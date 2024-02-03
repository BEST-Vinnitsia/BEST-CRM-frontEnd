import React from 'react';
import style from './table.module.scss';

interface IProps {
    sx?: {
        p?: string;
    };
    type?: 'checkbox';
    children?: React.ReactNode;
}

export default function TH({ children, sx, type }: IProps) {
    if (type === 'checkbox') {
        return (
            <th className={style['theadCell--checkbox']} style={{ padding: sx?.p }}>
                {children}
            </th>
        );
    }

    return (
        <th className={style['theadCell']} style={{ padding: sx?.p }}>
            {children}
        </th>
    );
}
