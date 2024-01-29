import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './dashboard.module.scss';
import { Loader, PreLoader, SidebarButton } from '../../components';
import { DesktopSidebar, Header, MobileSidebar } from '../../modules';
import { UtilsProvider } from '../../contexts';
import { sidebarConfig } from '../../routes/sidebarConfig';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen((prev) => !prev);
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
                                onClick={openSidebar}
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
