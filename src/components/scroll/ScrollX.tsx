import React from 'react';
import style from './scrollX.module.scss';

interface IProps {
    children: React.ReactNode;
}

export default function ScrollX({ children }: IProps) {
    return <div className={style['scrollX']}>{children}</div>;
}
