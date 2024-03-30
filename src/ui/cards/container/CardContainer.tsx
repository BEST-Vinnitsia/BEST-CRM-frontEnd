import React from 'react';
import style from './cardContainer.module.scss';

interface IProps {
    children: React.ReactNode;
    p?: string;
}

export default function CardContainer({ children, p }: IProps) {
    return (
        <div
            className={style['cardContainer']} //
            style={{ padding: p }}
        >
            {children}
        </div>
    );
}
