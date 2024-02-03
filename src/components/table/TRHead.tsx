import React from 'react';
import style from './table.module.scss';
import TableHeadCell from './TH';

interface IProps {
    children: React.ReactNode;
}

export default function TRHead({ children }: IProps) {
    return <tr className={style['theadRow']}>{children}</tr>;
}
