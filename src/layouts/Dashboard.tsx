import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import style from './dashboard.module.scss';
import { Loader, PreLoader } from '../components';
import { useUtilsContext } from '../contexts';
import { js } from '../helpers';
import SidebarContainer from '../components/sidebar/SidebarContainer';
import { SvgMenu } from '../assets/svg';
import SidebarContainerMobile from '../components/sidebar/SidebarContainerMobile';
import CircleButton from '../components/button/CircleButton';
import { useSelector } from '../redux/store';
import { IStore } from '../interfaces/redux/store';
import { AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
    const utilsContext = useUtilsContext();
    const smallSidebar = useSelector((state: IStore) => state.utils.smallSidebar);

    const [mobileSidebar, setMobileSidebar] = useState(false);
    const [mobileLayout, setMobileLayout] = useState(false);

    useEffect(() => {
        if (utilsContext?.windowSize) {
            const windowSize = utilsContext.windowSize;

            if (windowSize.width <= 720) {
                if (!mobileLayout) setMobileLayout(true);
            } else {
                if (mobileLayout) setMobileLayout(false);
            }

            if (windowSize.width > 720) {
                setMobileSidebar(false);
            }
        }
    }, [utilsContext]);

    return (
        <>
            <div className={style['container']}>
                <div className={style['bg']}>
                    <div
                        className={js(style['bg__item'], style['bg__item--blue'])}
                        style={{ translate: '-25% -50%', top: 0, left: 0 }}
                    />
                    <div
                        className={js(style['bg__item'], style['bg__item--orange'])}
                        style={{ translate: '50% -10%', top: 0, left: 0 }}
                    />
                    <div
                        className={js(style['bg__item'], style['bg__item--blue'])}
                        style={{ translate: '25% -25%', top: 0, right: 0 }}
                    />
                    <div
                        className={js(style['bg__item'], style['bg__item--blue'])}
                        style={{ translate: '-5% 50%', bottom: 0, left: 0 }}
                    />
                    <div
                        className={js(style['bg__item'], style['bg__item--orange'])}
                        style={{ translate: '20% 20%', bottom: 0, right: 0 }}
                    />

                    <div className={style['bg__blur']} />
                </div>

                <div
                    className={js(
                        style['layout'],
                        mobileLayout ? style['layout--mobile'] : style[`layout--${smallSidebar ? 'small' : 'default'}`],
                    )}
                >
                    <header className={style['layout__header']}>
                        <div className={style['start']}>
                            {mobileLayout && <CircleButton svg={<SvgMenu />} onClick={() => setMobileSidebar(true)} />}
                        </div>
                        <div className={style['end']}></div>
                    </header>

                    {!mobileLayout && (
                        <aside className={style['layout__aside']}>
                            <SidebarContainer smallSidebar={smallSidebar} />
                        </aside>
                    )}

                    <main className={style['layout__main']}>
                        <div className={style['layout__main-content']}>
                            <Outlet />
                        </div>
                    </main>
                </div>

                {mobileLayout && (
                    <AnimatePresence>
                        {mobileSidebar && <SidebarContainerMobile closeSidebar={() => setMobileSidebar(false)} />}
                    </AnimatePresence>
                )}
            </div>
        </>
    );
}
