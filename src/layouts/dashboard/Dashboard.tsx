import React, { useRef, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './dashboard.module.scss';
import { PATH_BaC, PATH_COMMITTEE, PATH_DASHBOARD, PATH_EVENT, PATH_MEMBER, PATH_MEMBERSHIP } from '../../routes/paths';
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
} from '../../components';
import {
    SvgBoardAndCoordinatorsSidebar,
    SvgCommitteeSidebar,
    SvgEventSidebar,
    SvgHomeSidebar,
    SvgLogo,
    SvgMembershipSidebar,
    SvgMenu,
    SvgUserSidebar,
} from '../../assets/svg';
import { utilsActions } from '../../redux/actions/utilsActions';
import { useWindowSize } from '../../hooks';
import { UserAvatar } from '../../assets/img';

export default function DashboardLayout() {
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
                                img={UserAvatar}
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
                            <SidebarButton path={PATH_DASHBOARD.ROOT} svg={<SvgHomeSidebar />} title="dashboard" />
                            <SidebarButton
                                path={PATH_BaC.ROOT}
                                svg={<SvgBoardAndCoordinatorsSidebar />}
                                title="board & coordinators"
                            />
                            <SidebarButton
                                path={PATH_COMMITTEE.ROOT}
                                svg={<SvgCommitteeSidebar />}
                                title="committees"
                            />
                            <SidebarButton path={PATH_MEMBER.ROOT} svg={<SvgUserSidebar />} title="members" />
                            <SidebarButton
                                path={PATH_MEMBERSHIP.ROOT}
                                svg={<SvgMembershipSidebar />}
                                title="membership"
                            />
                            <SidebarButton path={PATH_EVENT.ROOT} svg={<SvgEventSidebar />} title="Events" />
                        </nav>
                    )}
                </aside>
                {/*  */}

                {/*  */}
                <MobileSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} windowSize={windowSize}>
                    <SidebarButton
                        path={PATH_DASHBOARD.ROOT}
                        svg={<SvgHomeSidebar />}
                        title="Dashboard"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_BaC.ROOT}
                        svg={<SvgBoardAndCoordinatorsSidebar />}
                        title="Board & coordinators"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_COMMITTEE.ROOT}
                        svg={<SvgCommitteeSidebar />}
                        title="Committees"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_MEMBER.ROOT}
                        svg={<SvgUserSidebar />}
                        title="Members"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_MEMBERSHIP.ROOT}
                        svg={<SvgMembershipSidebar />}
                        title="Membership"
                        onClick={openSidebar}
                    />
                    <SidebarButton
                        path={PATH_EVENT.ROOT}
                        svg={<SvgEventSidebar />}
                        title="Events"
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
