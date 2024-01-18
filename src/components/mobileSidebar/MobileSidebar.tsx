import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './mobileSidebar.module.scss';

interface IProps {
    isOpen: boolean;
    setIsOpen: (data: boolean) => void;
    children: React.ReactNode;
    windowSize: {
        width: number;
        height: number;
    };
}

const portal: HTMLElement | null = document.getElementById('portal-mobile-sidebar');

export default function MobileSidebar({ isOpen, setIsOpen, windowSize, children }: IProps) {
    const [sidebarDelay, setSidebarDelay] = useState(false);

    useEffect(() => {
        if (windowSize.width >= 992) {
            if (isOpen) {
                setIsOpen(false);
            }
            if (sidebarDelay) {
                setTimeout(() => {
                    setSidebarDelay(false);
                }, 350);
            }
        }

        if (windowSize.width < 992 && !sidebarDelay) {
            setSidebarDelay(true);
        }
    }, [windowSize]);

    const closeSidebar = () => {
        setIsOpen(false);
    };

    if (!portal) return <></>;

    return createPortal(
        <>
            {(windowSize.width < 992 || sidebarDelay) && (
                <>
                    <aside className={style['mobileSidebar__asideMobile']} data-open={isOpen ? '1' : '0'}>
                        <nav className={style['mobileSidebar__asideMobile__container']}>{children}</nav>
                    </aside>

                    {/*  */}

                    {isOpen && <div className={style['mobileSidebar__bg']} onClick={closeSidebar} />}
                </>
            )}
        </>,
        portal,
    );
}
