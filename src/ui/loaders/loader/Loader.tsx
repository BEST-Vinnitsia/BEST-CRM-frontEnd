import React from 'react';
import style from './loader.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition,
};

interface IProps {
    loading: boolean;
}

export default function Loader({ loading }: IProps) {
    if (!loading) return <></>;
    
    return (
        <AnimatePresence>
            <motion.div className={style['loader']} {...animations}>
                <div className={style['loader__box']}>
                    <span className={style['loader__box-lineBox']}>
                        <span className={style['loader__box-lineBox-firstLine']} />
                        <span className={style['loader__box-lineBox-secondLine']} />
                    </span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
