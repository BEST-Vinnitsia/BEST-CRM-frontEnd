import React from 'react';
import style from './scrollY.module.scss';

interface IProps {
    children: React.ReactNode;
}

export default function ScrollY({ children }: IProps) {
    return <div className={style['scrollY']}>{children}</div>;
}
