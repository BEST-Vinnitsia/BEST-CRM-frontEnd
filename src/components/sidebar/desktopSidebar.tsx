import React from 'react';
import style from './desktopSidebar.module.scss';
import { useUtilsContext } from '../../contexts';

interface IProps {
    children?: React.ReactNode;
}

export default function DesktopSidebar({ children }: IProps) {
    const utilsContext = useUtilsContext();
    if (!utilsContext) return <></>;

    const { windowSize } = utilsContext;
    if (windowSize.width < 992) return <></>;

    return (
        <aside className={style['desktopSidebar']}>
            <nav className={style['desktopSidebar__nav']}>{children}</nav>
        </aside>
    );
}
