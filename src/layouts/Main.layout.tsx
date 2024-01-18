import React, { useRef, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './main.layout.module.scss';
import {
    PATH_BOARD,
    PATH_COMMITTEE,
    PATH_COORDINATOR,
    PATH_HOME,
    PATH_MEMBER,
    PATH_MEMBERSHIP,
} from '../routes/paths.routes';
import { useWindowSize } from '../hooks/useWindowSize';
import { CircleButton, MobileSidebar, PopupMenu, SidebarButton, UserButton } from '../components';
import { SvgLogo, SvgMenu, SvgUser } from '../assets/svg';
import { useOutsideClick } from '../hooks/useOutsideClick';

export default function MainLayout() {
    const windowSize = useWindowSize(300);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const userButtonRef = useRef<HTMLButtonElement>(null);

    const openSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <>
            <div className={style['mainLayout']}>
                <header className={style['mainLayout__header']}>
                    <div className={style['mainLayout__header__container']}>
                        <>
                            {windowSize.width < 992 && <CircleButton onClick={openSidebar} svg={<SvgMenu />} />}
                            {windowSize.width >= 992 && (
                                <span className={style['mainLayout__header__container__logo']}>
                                    <SvgLogo />
                                </span>
                            )}
                        </>
                        <>
                            <UserButton
                                buttonRef={userButtonRef}
                                onClick={() => setMenuOpen((prev) => !prev)}
                                svg={<SvgUser />}
                            />
                            <PopupMenu depRef={userButtonRef} onClose={() => setMenuOpen(false)} open={menuOpen} />
                        </>
                    </div>
                </header>

                {/*  */}
                <aside className={style['mainLayout__aside']}>
                    {windowSize.width >= 992 && (
                        <nav className={style['mainLayout__aside__container']}>
                            <SidebarButton path={PATH_HOME.ROOT} svg={<SvgMenu />} title="home" onClick={openSidebar} />
                            <SidebarButton
                                path={PATH_MEMBER.LIST}
                                svg={<SvgMenu />}
                                title="members"
                                onClick={openSidebar}
                            />
                            <SidebarButton
                                path={PATH_BOARD.LIST}
                                svg={<SvgMenu />}
                                title="board"
                                onClick={openSidebar}
                            />
                            <SidebarButton
                                path={PATH_COORDINATOR.LIST}
                                svg={<SvgMenu />}
                                title="coordinator"
                                onClick={openSidebar}
                            />
                            <SidebarButton
                                path={PATH_COMMITTEE.LIST}
                                svg={<SvgMenu />}
                                title="committees"
                                onClick={openSidebar}
                            />
                            <SidebarButton
                                path={PATH_MEMBERSHIP.LIST}
                                svg={<SvgMenu />}
                                title="membership"
                                onClick={openSidebar}
                            />
                        </nav>
                    )}
                </aside>
                {/*  */}

                {/*  */}
                <MobileSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>
                    <SidebarButton path={PATH_HOME.ROOT} svg={<SvgMenu />} title="home" onClick={openSidebar} />
                    <SidebarButton path={PATH_MEMBER.LIST} svg={<SvgMenu />} title="members" onClick={openSidebar} />
                    <SidebarButton path={PATH_BOARD.LIST} svg={<SvgMenu />} title="board" onClick={openSidebar} />
                    <SidebarButton
                        path={PATH_COORDINATOR.LIST}
                        svg={<SvgMenu />}
                        title="coordinator"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_COMMITTEE.LIST}
                        svg={<SvgMenu />}
                        title="committees"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_MEMBERSHIP.LIST}
                        svg={<SvgMenu />}
                        title="membership"
                        onClick={openSidebar}
                    />
                </MobileSidebar>
                {/*  */}

                <main className={style['mainLayout__main']}>
                    <Outlet />
                </main>
            </div>
        </>
    );
}
