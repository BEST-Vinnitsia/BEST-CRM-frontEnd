import React from 'react';
import style from './circleButton.module.scss';

interface IProps {
    svg: React.ReactNode;
    onClick?: () => void;
    elementRef?: React.LegacyRef<HTMLButtonElement>;
}

export default function CircleButton(props: IProps) {
    return (
        <button ref={props.elementRef} className={style['circleButton']} onClick={props.onClick}>
            <div className={style['circleButton__svg']}>{props.svg}</div>
        </button>
    );
}
