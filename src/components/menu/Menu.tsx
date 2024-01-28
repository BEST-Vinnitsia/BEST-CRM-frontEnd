import React, { useRef, useState, useEffect } from 'react';
import { useOutsideClick } from '../../hooks';
import { createPortal } from 'react-dom';
import style from './menu.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface IProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    depRef?: React.RefObject<HTMLElement>;
    windowSize: {
        width: number;
        height: number;
    };
}

interface ITargetPosition {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

const portal: HTMLElement | null = document.getElementById('portal-menu');

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition,
};

export default function Menu({ children, onClose, open, depRef, windowSize }: IProps) {
    const [triggerPosition, setTriggerPosition] = useState<ITargetPosition>();
    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideClick({
        elementRef: menuRef,
        triggerRef: depRef,
        handler: onClose,
        enable: open,
    });

    useEffect(() => {
        if (!open) return;
        if (!depRef) return;

        setTriggerPosition(depRef?.current?.getBoundingClientRect());
    }, [depRef, open, windowSize]);

    if (!portal) return <></>;

    return createPortal(
        <AnimatePresence>
            {triggerPosition && open && (
                <motion.div
                    ref={menuRef}
                    className={style['menu']}
                    style={{
                        top: triggerPosition.bottom + 10,
                        left: triggerPosition.left - 200 + 20 + 14 * Math.sqrt(2) + 14 / 2,
                    }}
                    {...animations}
                >
                    <span className={style['menu__arrow']} />

                    {children}
                </motion.div>
            )}
        </AnimatePresence>,
        portal,
    );
}
