import React from 'react';
import style from './userButton.module.scss';

interface IProps {
    svg?: React.ReactNode;
    img?: string;
    onClick: () => void;
    buttonRef?: React.RefObject<HTMLButtonElement>;
}

export default function UserButton({ img, svg, onClick, buttonRef }: IProps) {
    if (!img && !svg) return <></>;

    return (
        <button ref={buttonRef} className={style['userButton']} onClick={onClick}>
            {!svg ? img : svg}
        </button>
    );
}
