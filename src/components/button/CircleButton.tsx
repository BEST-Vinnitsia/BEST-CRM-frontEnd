import React from 'react';
import style from './circleButton.module.scss';

interface IProps {
    svg: React.ReactNode;
    onClick?: () => void;
}

export default function CircleButton(props: IProps) {
    return (
        <span className={style['circleButton']} onClick={props.onClick}>
            {props.svg}
        </span>
    );
}
