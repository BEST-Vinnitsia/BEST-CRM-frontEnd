import React, { useEffect } from 'react';
import style from './preLoader.module.scss';
import { SvgBESTLogo, SvgVinny } from '../../assets/svg';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/store';
import { utilsActions } from '../../redux/actions/utilsActions';

export default function PreLoader() {
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
        <div className={style['preLoader']}>
            <div className={style['preLoader__logoContainer']}>
                <SvgVinny />
            </div>
            <div className={style['preLoader__logoContainer']}>
                <SvgBESTLogo />
            </div>
        </div>
    );
}
