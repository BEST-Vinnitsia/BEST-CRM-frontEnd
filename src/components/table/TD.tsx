import React from 'react';
import style from './table.module.scss';

interface IProps {
    sx?: {
        p?: string;
    };
    children?: React.ReactNode;
}

export default function TD({ children, sx }: IProps) {
    return (
        <td className={style['tbodyCell']} style={{ padding: sx?.p }}>
            {children}
        </td>
    );
}
