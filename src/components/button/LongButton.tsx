import React from 'react';
import style from './longButton.module.scss';
import { SvgCircle, SvgClose } from '../../assets/svg';

interface IProps {
    title: string;
    onClick?: () => void;
    disable?: boolean;
    loading?: boolean;
}

export default function LongButton({ title, onClick, disable = false, loading = false }: IProps) {
    return (
        <button
            className={style['longButton']}
            data-disable={disable ? '1' : '0'}
            data-loading={loading ? '1' : '0'}
            onClick={onClick}
        >
            {loading ? (
                <span className={style['longButton__loading']}>
                    <span className={style['longButton__loading__spinner']}>
                        <SvgCircle />
                    </span>
                </span>
            ) : (
                <span className={style['longButton__title']}>{title}</span>
            )}
        </button>
    );
}
