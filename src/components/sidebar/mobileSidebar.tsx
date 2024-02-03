import React, { useEffect, useState } from 'react';
import style from './mobileSidebar.module.scss';
import { useUtilsContext } from '../../contexts';
import { createPortal } from 'react-dom';
import { joinStyle } from '../../utils';

interface IProps {
    isOpen: boolean;
    setIsOpen: (data: boolean) => void;
    children?: React.ReactNode;
}

const portal: HTMLElement | null = document.getElementById('portal');

export default function MobileSidebar({ children, isOpen, setIsOpen }: IProps) {
    const utilsContext = useUtilsContext();
    const [sidebarDelay, setSidebarDelay] = useState(false);

    useEffect(() => {
        if (!utilsContext) return;
        const { windowSize } = utilsContext;

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
    }, [utilsContext?.windowSize]);

    const closeSidebar = () => {
        setIsOpen(false);
    };

    if (!portal) return <></>;
    if (!utilsContext) return <></>;
    const { windowSize } = utilsContext;
    if (windowSize.width >= 992 || !sidebarDelay) return <></>;

    return createPortal(
        <>
            <aside className={joinStyle(style['mobileSidebar'], style[`mobileSidebar--open-${isOpen}`])}>
                <nav className={style['mobileSidebar__container']}>{children}</nav>
            </aside>

            {/*  */}

            {isOpen && <div className={style['mobileSidebar-bg']} onClick={closeSidebar} />}
        </>,
        portal,
    );
}
