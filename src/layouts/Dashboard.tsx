import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './dashboard.module.scss';
import { DesktopSidebar, Header, Loader, MobileSidebar, PreLoader, SidebarButton } from '../components';
import { UtilsProvider } from '../contexts';
import { sidebarConfig } from '../routes/sidebarConfig';
import { utilsActions } from '../redux/actions/utilsActions';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen((prev) => !prev);
        utilsActions.loading(false);
    };

    const stopLoader = () => {
        utilsActions.loading(false);
    };

    return (
        <UtilsProvider>
            <PreLoader />

            <div className={style['dashboard']}>
                <div className={style['dashboard__headerContainer']}>
                    <Header openSidebar={openSidebar} />
                </div>

                {/*  */}
                <div className={style['dashboard__asideContainer']}>
                    <DesktopSidebar>
                        {sidebarConfig.map((item, i) => (
                            <SidebarButton
                                key={i}
                                path={item.path}
                                svg={item.svg}
                                title={item.title}
                                onClick={stopLoader}
                            />
                        ))}
                    </DesktopSidebar>
                </div>

                <MobileSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>
                    {sidebarConfig.map((item, i) => (
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

                <main className={style['dashboard__main']}>
                    <Outlet />
                    <Loader />
                </main>
            </div>
        </UtilsProvider>
    );
}
