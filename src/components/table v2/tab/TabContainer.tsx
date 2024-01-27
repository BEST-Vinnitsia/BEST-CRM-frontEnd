import React from 'react';
import style from './tab.module.scss';

interface IProps {
    children: React.ReactNode;
}

export default function TabContainer({ children }: IProps) {
    return (
        <div className={style['table__tabs-external-wrapper']}>
            <div className={style['table__tabs-internal-wrapper']}>
                <div className={style['table__tabs-container']}>
                    <div className={style['table__tabs']}>{children}</div>
                    <span className={style['table__tabs-line']} />
                </div>
            </div>
        </div>
    );
}
