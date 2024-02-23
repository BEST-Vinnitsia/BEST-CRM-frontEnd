import React from 'react';
import style from './cardContainer.module.scss';

interface IProps {
    children: React.ReactNode;
}

export default function CardContainer({ children }: IProps) {
    return (
        <div className={style['cardContainer']}>
            {children}
        </div>
    );
}
