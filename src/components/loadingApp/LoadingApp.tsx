import React, { useEffect } from 'react';
import style from './loadingApp.module.scss';
import { SvgBESTLogo, SvgVinny } from '../../assets/svg';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/store';
import { utilsActions } from '../../redux/actions/utilsActions';

export default function LoadingApp() {
    const isLoadingApp = useSelector((state: IStore) => state.utils.isLoadingApp);

    useEffect(() => {
        if (isLoadingApp) return;

        const timer = setTimeout(() => {
            utilsActions.loadingApp(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (isLoadingApp) return <></>;

    return (
        <div className={style['loadingApp']}>
            <div className={style['loadingApp__logoContainer']}>
                <SvgVinny />
            </div>
            <div className={style['loadingApp__logoContainer']}>
                <SvgBESTLogo />
            </div>
        </div>
    );
}
