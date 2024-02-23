import React, { useEffect } from 'react';
import style from './preLoader.module.scss';
import { SvgBESTLogo, SvgVinny } from '../../assets/svg';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/redux/store';
import { utilsActions } from '../../redux/actions/utilsActions';
import { AnimatePresence, motion } from 'framer-motion';

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

const animations = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition,
};

export default function PreLoader() {
    const isLoadingApp = useSelector((state: IStore) => state.utils.isLoadingApp);

    useEffect(() => {
        if (isLoadingApp) return;

        const timer = setTimeout(() => {
            utilsActions.loadingApp(true);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isLoadingApp && (
                <motion.div className={style['preLoader']} {...animations}>
                    <div className={style['preLoader__logoContainer']}>
                        <SvgVinny />
                    </div>
                    <div className={style['preLoader__logoContainer']}>
                        <SvgBESTLogo />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
