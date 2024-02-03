import React from 'react';
import style from './sidebarButton.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { joinStyle } from '../../utils/';

interface IProps {
    elementRef?: React.LegacyRef<HTMLAnchorElement>;
    svg: React.ReactNode;
    title: string;
    path: string;
    onClick?: () => void;
}

export default function SidebarButton({ path, svg, title, elementRef, onClick }: IProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = () => {
        navigate(path);

        if (onClick) {
            onClick();
        }
    };

    const checkPath = () => {
        const regex = new RegExp(`^\\${path}`);
        const regex2 = new RegExp(`^\\${path}[0-9a-zA-Z]`);

        const match = regex.test(location.pathname);
        const match2 = regex2.test(location.pathname);

        if (match === true && match2 === false) return true;
        return false;
    };

    return (
        <a
            ref={elementRef}
            className={joinStyle(style['sidebarButton'], style[`sidebarButton--active-${checkPath()}`])}
            onClick={redirect}
        >
            <div className={style['sidebarButton__container']}>
                <span className={style['sidebarButton__container-svg']}>{svg}</span>
                <span className={style['sidebarButton__container-textContainer']}>
                    <span className={style['sidebarButton__container-textContainer-text']}>{title}</span>
                </span>
            </div>
        </a>
    );
}
