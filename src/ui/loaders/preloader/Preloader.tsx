import React from 'react';
import style from './preloader.module.scss';
import { SvgLogo } from '../../../assets/svg';

interface IProps {
    loading: boolean;
}

export default function Preloader({ loading }: IProps) {
    if (!loading) return <></>;

    return (
        <div className={style['preloader']}>
            <div className={style['preloader__content']}>
                <span className={style['preloader__content-logo']}>
                    <SvgLogo />
                </span>

                <div className={style['preloader__content-text']}>
                    <span className={style['preloader__content-text-crm']}>CRM</span>
                    <span className={style['preloader__content-text-loading']}>Loading...</span>
                </div>
            </div>
        </div>
    );
}
