import React, { useRef, useState, useEffect } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import style from './popupMenu.module.scss';

interface IProps {
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

export default function PopupMenu({ onClose, open, depRef, windowSize }: IProps) {
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
                    className={style['popupMenu']}
                    // data-active={open ? '1' : '0'}
                    style={{
                        top: triggerPosition.bottom + 10,
                        left: triggerPosition.left - 200 + 20 + 14 * Math.sqrt(2) + 14 / 2,
                    }}
                >
                    <span className={style['popupMenu__arrow']} />

                    <div className={style['popupMenu__userInfoContainer']}>
                        <h6>User name</h6>
                        <p>user email</p>
                    </div>

                    <hr />

                    <li>
                        Logout
                        <span />
                    </li>
                </div>
            )}
        </>,
        portal,
    );
}
