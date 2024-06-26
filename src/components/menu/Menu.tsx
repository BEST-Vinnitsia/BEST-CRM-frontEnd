import React, { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks';
import { createPortal } from 'react-dom';
import style from './menu.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useUtilsContext } from '../../contexts/UtilsContext';
import { animationOpacity } from '../../styles/animationConfig';

interface IProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    depRef?: React.RefObject<HTMLElement>;
}

interface ITargetPosition {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

const portal: HTMLElement | null = document.getElementById('portal');

export default function Menu({ children, onClose, open, depRef }: IProps) {
    const utilsContext = useUtilsContext();

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
    }, [depRef, open, utilsContext?.windowSize]);

    if (!portal) return <></>;
    if (!utilsContext) return <></>;

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
                    {...animationOpacity}
                >
                    <span className={style['menu__arrow']} />

                    {children}
                </motion.div>
            )}
        </AnimatePresence>,
        portal,
    );
}
