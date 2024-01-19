import React from 'react';
import style from './userButton.module.scss';

interface IProps {
    svg?: React.ReactNode;
    img?: string;
    active: boolean;
    onClick: () => void;
    buttonRef?: React.RefObject<HTMLButtonElement>;
}

export default function UserButton({ img, svg, active, onClick, buttonRef }: IProps) {
    if (!img && !svg) return <></>;

    return (
        <button ref={buttonRef} className={style['userButton']} onClick={onClick} data-active={active ? '1' : '0'}>
            <div className={style['userButton__container']}>
                {img ? (
                    <img src={img} alt="" className={style['userButton__container__img']} />
                ) : (
                    <span className={style['userButton__container__svg']}>{svg && svg}</span>
                )}
            </div>
        </button>
    );
}
