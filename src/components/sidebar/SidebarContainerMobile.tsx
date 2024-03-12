import React from 'react';
import style from './sidebarContainerMobile.module.scss';
import { ImgLogoWithText } from '../../assets/img';
import { sidebarConfig } from '../../routes/sidebarConfig';
import SidebarButton from '../../ui/sidebar/button/SidebarButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkRoutePath } from '../../helpers';
import { motion } from 'framer-motion';
import { animationSidebarMobile } from '../../styles/animationConfig';

interface IProps {
    closeSidebar: () => void;
}

export default function SidebarContainerMobile({ closeSidebar }: IProps) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={style['container']}>
            <motion.div className={style['sidebar']} {...animationSidebarMobile}>
                <div className={style['sidebar__logoContainer']}>
                    <div className={style['sidebar__logoContainer-logo']}>
                        <img src={ImgLogoWithText} alt="" />
                    </div>
                </div>

                <div className={style['sidebar__buttonContainer']}>
                    {sidebarConfig.map((item, i) => (
                        <SidebarButton
                            key={i}
                            children={item.svg}
                            title={item.title}
                            active={checkRoutePath(item.path, location.pathname)}
                            onClick={() => {
                                navigate(item.path);
                                closeSidebar();
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            <div className={style['close']} onClick={closeSidebar} />
        </div>
    );
}
