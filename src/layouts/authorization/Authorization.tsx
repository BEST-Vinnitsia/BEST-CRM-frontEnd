import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './authorization.module.scss';
import { SvgLogo } from '../../assets/svg';

export default function AuthorizationLayout() {
    return (
        <div className={style['authLayout']}>
            <header className={style['authLayout__header']}>
                <div className={style['authLayout__header-container']}>
                    <span className={style['authLayout__header-container-logo']}>
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
