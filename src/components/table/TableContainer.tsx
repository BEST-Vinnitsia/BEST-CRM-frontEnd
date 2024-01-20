import React from 'react';
import style from './table.module.scss';
import TableHeader from './TableHeader';
import { ITableContainerProps } from './table.interface';

export default function TableContainer(props: ITableContainerProps) {
    return (
        <div className={style['tableWrapper']}>
            <table>
                {/* HEAD */}
                <thead>
                    <TableHeader head={props.head} />
                </thead>

                {/* BODY */}
                <tbody>{props.children}</tbody>
            </table>
        </div>
    );
}
