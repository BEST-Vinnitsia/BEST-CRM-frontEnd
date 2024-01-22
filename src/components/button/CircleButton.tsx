import React from 'react';
import style from './circleButton.module.scss';

interface IProps {
    svg: React.ReactNode;
    onClick?: () => void;
}

export default function CircleButton(props: IProps) {
    return (
        <button className={style['circleButton']} onClick={props.onClick}>
            <div className={style['circleButton__container']}>{props.svg}</div>
        </button>
    );
}
