import React from 'react';
import style from './titleContainer.module.scss';
import { joinStyle } from '../../utils';

interface IProps {
    children: React.ReactNode;
    position?: 'center' | 'start' | 'end';
}

export default function TitleContainer({ children, position = 'start' }: IProps) {
    return (
        <div className={joinStyle(style[`titleContainer`], style[`titleContainer--position-${position}`])}>
            {children}
        </div>
    );
}
