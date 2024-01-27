import React, { useRef, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './main.module.scss';
import {
    PATH_BaC,
    PATH_COMMITTEE,
    PATH_ERROR,
    PATH_HOME,
    PATH_MEETING,
    PATH_MEMBER,
    PATH_MEMBERSHIP,
} from '../routes/paths';
import {
    CircleButton,
    Loader,
    PreLoader,
    Menu,
    SidebarButton,
    UserButton,
    MobileSidebar,
    MenuText,
    MenuSplit,
    MenuButton,
} from '../components';
import { SvgLogo, SvgMenu, SvgUser } from '../assets/svg';
import { utilsActions } from '../redux/actions/utilsActions';
import { useWindowSize } from '../hooks/useWindowSize';
import UserImg from '../assets/img/avatar_25.jpg';

export default function MainLayout() {
    const windowSize = useWindowSize(300);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const userButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        utilsActions.updateWindowSize(windowSize);
    }, [windowSize]);

    const openSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const openMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <>
            <PreLoader />

            <div className={style['mainLayout']}>
                <header className={style['mainLayout__header']}>
                    <div className={style['mainLayout__header-container']}>
                        <>
                            {windowSize.width < 992 && <CircleButton onClick={openSidebar} svg={<SvgMenu />} />}
                            {windowSize.width >= 992 && (
                                <span className={style['mainLayout__header-container-logo']}>
                                    <SvgLogo />
                                </span>
                            )}
                        </>
                        <>
                            <UserButton
                                buttonRef={userButtonRef}
                                active={menuOpen}
                                onClick={openMenu}
                                // svg={<SvgUser />}
                                img={UserImg}
                            />
                            <Menu depRef={userButtonRef} onClose={openMenu} open={menuOpen} windowSize={windowSize}>
                                <MenuText title="user name" subTitle="user email" />
                                <MenuSplit />
                                <MenuButton title="Profile" onClick={openMenu} />
                                <MenuButton title="Settings" onClick={openMenu} />
                                <MenuButton title="Theme" onClick={openMenu} />
                                <MenuSplit />
                                <MenuButton title="Logout" color="red" onClick={openMenu} />
                            </Menu>
                        </>
                    </div>
                </header>

                {/*  */}
                <aside className={style['mainLayout__aside']}>
                    {windowSize.width >= 992 && (
                        <nav className={style['mainLayout__aside-container']}>
                            <SidebarButton path={PATH_HOME.ROOT} svg={<SvgMenu />} title="home" />
                            <SidebarButton path={PATH_MEMBER.ROOT} svg={<SvgMenu />} title="members" />
                            <SidebarButton path={PATH_BaC.ROOT} svg={<SvgMenu />} title="board & coordinators" />
                            <SidebarButton path={PATH_COMMITTEE.ROOT} svg={<SvgMenu />} title="committees" />
                            <SidebarButton path={PATH_MEMBERSHIP.ROOT} svg={<SvgMenu />} title="membership" />
                            <SidebarButton path={PATH_MEETING.ROOT} svg={<SvgMenu />} title="meeting" />
                            <SidebarButton path={PATH_ERROR[404]} svg={<SvgMenu />} title="404" />
                            <SidebarButton path={PATH_ERROR[403]} svg={<SvgMenu />} title="403" />
                            <SidebarButton path={PATH_ERROR[500]} svg={<SvgMenu />} title="500" />
                        </nav>
                    )}
                </aside>
                {/*  */}

                {/*  */}
                <MobileSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} windowSize={windowSize}>
                    <SidebarButton path={PATH_HOME.ROOT} svg={<SvgMenu />} title="home" onClick={openSidebar} />
                    <SidebarButton path={PATH_MEMBER.ROOT} svg={<SvgMenu />} title="members" onClick={openSidebar} />
                    <SidebarButton
                        path={PATH_BaC.ROOT}
                        svg={<SvgMenu />}
                        title="board & coordinators"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_COMMITTEE.ROOT}
                        svg={<SvgMenu />}
                        title="committees"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_MEMBERSHIP.ROOT}
                        svg={<SvgMenu />}
                        title="membership"
                        onClick={openSidebar}
                    />
                </MobileSidebar>
                {/*  */}

                <main className={style['mainLayout__main']}>
                    <Outlet />
                    <Loader />
                </main>
            </div>
        </>
    );
}
