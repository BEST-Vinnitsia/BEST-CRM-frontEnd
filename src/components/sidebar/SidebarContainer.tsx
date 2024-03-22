import React from 'react';
import style from './sidebarContainer.module.scss';
import { ImgLogoWithText } from '../../assets/img';
import { sidebarConfig } from '../../routes/sidebarConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkRoutePath, js } from '../../helpers';
import { utilsActions } from '../../redux/actions/utilsActions';
import { SvgLogo } from '../../assets/svg';
import { SidebarButton, SidebarButtonSmall, SidebarToggle } from '../../ui';

interface IProps {
    smallSidebar: boolean;
}

export default function SidebarContainer({ smallSidebar }: IProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        utilsActions.smaleSidebar(!smallSidebar);
    };

    return (
        <div className={js(style['sidebar'], style[`sidebar--${smallSidebar ? 'small' : 'default'}`])}>
            <SidebarToggle smallSidebar={smallSidebar} onClick={toggleSidebar} />

            <div className={style['sidebar__logoContainer']}>
                <div className={style['sidebar__logoContainer-logo']}>
                    {smallSidebar ? <SvgLogo /> : <img src={ImgLogoWithText} alt="" />}
                </div>
            </div>

            <div className={style['sidebar__buttonContainer']}>
                {smallSidebar ? (
                    <>
                        {sidebarConfig.map((item, i) => (
                            <SidebarButtonSmall
                                key={i}
                                children={item.svg}
                                title={item.title}
                                active={checkRoutePath(item.path, location.pathname)}
                                onClick={() => navigate(item.path)}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {sidebarConfig.map((item, i) => (
                            <SidebarButton
                                key={i}
                                children={item.svg}
                                title={item.title}
                                active={checkRoutePath(item.path, location.pathname)}
                                onClick={() => navigate(item.path)}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
