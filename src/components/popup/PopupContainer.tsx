import React from 'react';
import style from './popupContainer.module.scss';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface IProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
}

const portal = document.getElementById('portal-popup');

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition,
};

export default function PopupContainer({ children, onClose, isOpen }: IProps) {
    if (!portal) return <></>;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div className={style['popupContainer']} {...animations}>
                    <div className={style['popupContainer__content']}>{children}</div>
                    <div className={style['popupContainer__bg']} onClick={onClose} />
                </motion.div>
            )}
        </AnimatePresence>,
        portal,
    );
}
