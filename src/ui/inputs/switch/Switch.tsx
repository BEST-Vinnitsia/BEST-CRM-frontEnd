import React from 'react';
import style from './switch.module.scss';
import { js } from '../../../helpers';

interface IProps {
    label?: string;
    onClick: () => void;
    value: boolean;
}

export default function Switch({ label, onClick, value }: IProps) {
    return (
        <div className={style['switch-container']} onClick={onClick}>
            <span className={style['switch-container__label']}>{label}</span>

            <button className={js(style['switch'], value ? style['switch--active'] : '')}>
                <div className={style['switch__toggle']} />
            </button>
        </div>
    );
}
