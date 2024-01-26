import React from 'react';
import style from './loader.module.scss';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/redux/store';
import { AnimatePresence, motion } from 'framer-motion';

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition,
};

export default function Loader() {
    const isLoading = useSelector((state: IStore) => state.utils.isLoading);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div className={style['LoaderDefault-Container']} {...animations}>
                    <div className={style.LoaderDefault}>
                        <span className={style.loader}>
                            <span className={style.firstLine} />
                            <span className={style.secondLine} />
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
