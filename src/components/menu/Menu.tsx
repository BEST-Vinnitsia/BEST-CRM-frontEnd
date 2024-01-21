import React, { useRef, useState, useEffect } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import style from './menu.module.scss';

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
    if (!open) return <></>;

    return createPortal(
        <>
            {triggerPosition && (
                <div
                    ref={menuRef}
                    className={style['menu']}
                    style={{
                        top: triggerPosition.bottom + 10,
                        left: triggerPosition.left - 200 + 20 + 14 * Math.sqrt(2) + 14 / 2,
                    }}
                >
                    <span className={style['menu__arrow']} />

                    {children}
                </div>
            )}
        </>,
        portal,
    );
}
