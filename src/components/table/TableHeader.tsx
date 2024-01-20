import React from 'react';
import style from './table.module.scss';
import { ITableHeadProps } from './table.interface';

export default function TableHeader({ head }: ITableHeadProps) {
    return (
        <tr className={style['tableHeaderRow']}>
            {head.map((item, i) => (
                <th key={i}>
                    <div data-size={item.size}>{item.title}</div>
                </th>
            ))}
        </tr>
    );
}
