import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './authorization.module.scss';
import { SvgLogo } from '../../assets/svg';

export default function AuthorizationLayout() {
    return (
        <div className={style['authorization']}>
            <header className={style['authorization__header']}>
                <div className={style['authorization__header-container']}>
                    <span className={style['authorization__header-container-logo']}>
                        <SvgLogo />
                    </span>
                </div>
            </header>

            <main className={style['authorization__main']}>
                <Outlet />
            </main>
        </div>
    );
}
