import React, { useRef, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './dashboard.module.scss';
import { Loader, PreLoader, SidebarButton } from '../../components';
import { DesktopSidebar, Header, MobileSidebar } from '../../modules';
import { UtilsProvider } from '../../contexts';
import { PATH_BaC, PATH_COMMITTEE, PATH_DASHBOARD, PATH_EVENT, PATH_MEMBER, PATH_MEMBERSHIP } from '../../routes/paths';
import { pageNames } from '../../constants';
import {
    SvgBoardAndCoordinatorsSidebar,
    SvgCommitteeSidebar,
    SvgEventSidebar,
    SvgHomeSidebar,
    SvgMembershipSidebar,
    SvgUserSidebar,
} from '../../assets/svg';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarButtons = [
        { title: pageNames.pages.dashboard, path: PATH_DASHBOARD.ROOT, svg: <SvgHomeSidebar /> },
        { title: pageNames.pages.BaC, path: PATH_BaC.ROOT, svg: <SvgBoardAndCoordinatorsSidebar /> },
        { title: pageNames.pages.committee, path: PATH_COMMITTEE.ROOT, svg: <SvgCommitteeSidebar /> },
        { title: pageNames.pages.event, path: PATH_EVENT.ROOT, svg: <SvgEventSidebar /> },
        { title: pageNames.pages.member, path: PATH_MEMBER.ROOT, svg: <SvgUserSidebar /> },
        { title: pageNames.pages.membership, path: PATH_MEMBERSHIP.ROOT, svg: <SvgMembershipSidebar /> },
    ];

    const openSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <UtilsProvider>
            <PreLoader />

            <div className={style['mainLayout']}>
                <div className={style['mainLayout__headerContainer']}>
                    <Header openSidebar={openSidebar} />
                </div>

                {/*  */}
                <div className={style['mainLayout__asideContainer']}>
                    <DesktopSidebar>
                        {sidebarButtons.map((item, i) => (
                            <SidebarButton
                                key={i}
                                path={item.path}
                                svg={item.svg}
                                title={item.title}
                                onClick={openSidebar}
                            />
                        ))}
                    </DesktopSidebar>
                </div>

                <MobileSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>
                    {sidebarButtons.map((item, i) => (
                        <SidebarButton
                            key={i}
                            path={item.path}
                            svg={item.svg}
                            title={item.title}
                            onClick={openSidebar}
                        />
                    ))}
                </MobileSidebar>
                {/*  */}

                <main className={style['mainLayout__main']}>
                    <Outlet />
                    <Loader />
                </main>
            </div>
        </UtilsProvider>
    );
}
