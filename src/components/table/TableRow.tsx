import React from 'react';
import style from './table.module.scss';
import { ITableRowProps } from './table.interface';

export default function TableRow({ titleList }: ITableRowProps) {
    return (
        <tr className={style['tableRow']}>
            {titleList.map((item, i) => (
                <td key={i}>{item.title}</td>
            ))}
        </tr>
    );
}
