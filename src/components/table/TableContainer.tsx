import React from 'react';
import style from './table.module.scss';
import TableHeader from './TableHeader';
import { ITableContainerProps } from './table.interface';
import ScrollX from '../scroll/ScrollX';

export default function TableContainer(props: ITableContainerProps) {
    return (
        <ScrollX>
            <table className={style['tableWrapper']}>
                {/* HEAD */}
                <thead>
                    <TableHeader head={props.head} />
                </thead>

                {/* BODY */}
                <tbody>{props.children}</tbody>
            </table>
        </ScrollX>
    );
}
