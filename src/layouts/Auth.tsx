import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './auth.module.scss';
import { SvgLogo } from '../assets/svg';

export default function AuthLayout() {
    return (
        <div className={style['authLayout']}>
            <header className={style['authLayout__header']}>
                <div className={style['authLayout__header__container']}>
                    <span className={style['authLayout__header__container__logo']}>
                        <SvgLogo />
                    </span>
                </div>
            </header>

            <main className={style['authLayout__main']}>
                <Outlet />
            </main>
        </div>
    );
}
