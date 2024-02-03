import React from 'react';
import style from './userButton.module.scss';
import { joinStyle } from '../../utils/';

interface IProps {
    svg?: React.ReactNode;
    img?: string;
    active: boolean;
    onClick: () => void;
    elementRef?: React.RefObject<HTMLButtonElement>;
}

export default function UserButton({ img, svg, active, onClick, elementRef }: IProps) {
    if (!img && !svg) return <></>;

    return (
        <button
            ref={elementRef}
            onClick={onClick}
            className={joinStyle(style['userButton'], style[`userButton--active-${active}`])}
        >
            <div className={style['userButton__container']}>
                {img ? (
                    <img src={img} alt="" className={style['userButton__container-img']} />
                ) : (
                    <span className={style['userButton__container-svg']}>{svg && svg}</span>
                )}
            </div>
        </button>
    );
}
