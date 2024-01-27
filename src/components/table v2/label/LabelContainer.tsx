import React from 'react';
import style from './label.module.scss';

interface IProps {
    children?: React.ReactNode;
}

export default function LabelContainer({ children }: IProps) {
    return (
        <td className={style['status']}>
            <span className={style['status__wrapper']}>{children}</span>
        </td>
    );
}
