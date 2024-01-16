import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './mobileSidebar.module.scss';
import { useWindowSize } from '../../hooks/useWindowSize';

interface IProps {
    isOpen: boolean;
    setIsOpen: (data: boolean) => void;
    children: React.ReactNode;
}

const portal: HTMLElement | null = document.getElementById('portal-mobile-sidebar');

export default function MobileSidebar(props: IProps) {
    const windowSize = useWindowSize(300);

    const [sidebarDelay, setSidebarDelay] = useState(false);

    useEffect(() => {
        if (windowSize.width >= 992) {
            if (props.isOpen) {
                props.setIsOpen(false);
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
        props.setIsOpen(false);
    };

    if (!portal) return <></>;

    return createPortal(
        <>
            {(windowSize.width < 992 || sidebarDelay) && (
                <>
                    <aside className={style['mobileSidebar__asideMobile']} data-open={props.isOpen ? '1' : '0'}>
                        <nav className={style['mobileSidebar__asideMobile__container']}>{props.children}</nav>
                    </aside>

                    {/*  */}

                    {props.isOpen && <div className={style['mobileSidebar__bg']} onClick={closeSidebar} />}
                </>
            )}
        </>,
        portal,
    );
}
