import React from 'react';
import style from './scroll.module.scss';

interface IProps {
    children: React.ReactNode;
}

export default function ScrollY({ children }: IProps) {
    return (
        <div className={style['scrollY']}>
            {children}
            <div className={style['scrollY__scrollContainer']}>
                <div className={style['scrollY__scrollContainer__scroll']} />
            </div>
        </div>
    );
}
