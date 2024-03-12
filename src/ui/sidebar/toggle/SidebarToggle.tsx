import React from 'react';
import style from './sidebarToggle.module.scss';
import { SvgArrowLeft, SvgArrowRight } from '../../../assets/svg';

interface IProps {
    smallSidebar: boolean;
    onClick: () => void;
}

export default function SidebarToggle({ smallSidebar, onClick }: IProps) {
    return (
        <div className={style['toggle']} onClick={onClick}>
            <div className={style['toggle__svg']}>
                {smallSidebar ? <SvgArrowRight /> : <SvgArrowLeft />}
            </div>
        </div>
    );
}
