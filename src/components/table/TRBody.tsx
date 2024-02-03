import React from 'react';
import style from './table.module.scss';

interface IProps {
    children: React.ReactNode;
}

export default function TRBody({ children }: IProps) {
    return <tr className={style['tbodyRow']}>{children}</tr>;
}
