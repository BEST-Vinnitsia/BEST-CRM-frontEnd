import React from 'react';
import style from './sidebarButton.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { joinStyle } from '../../utils/';

interface IProps {
    svg: React.ReactNode;
    title: string;
    path: string;
    onClick?: () => void;
}

export default function SidebarButton(props: IProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = () => {
        navigate(props.path);

        if (props.onClick) {
            props.onClick();
        }
    };

    const checkPath = () => {
        const regex = new RegExp(`^\\${props.path}`);
        const regex2 = new RegExp(`^\\${props.path}[0-9a-zA-Z]`);

        const match = regex.test(location.pathname);
        const match2 = regex2.test(location.pathname);

        if (match === true && match2 === false) return true;
        return false;
    };

    return (
        <a
            className={joinStyle(style['sidebarButton'], style[`sidebarButton--active-${checkPath()}`])}
            onClick={redirect}
        >
            <div className={style['sidebarButton__container']}>
                <span className={style['sidebarButton__container-svg']}>{props.svg}</span>
                <span className={style['sidebarButton__container-textContainer']}>
                    <span className={style['sidebarButton__container-textContainer-text']}>{props.title}</span>
                </span>
            </div>
        </a>
    );
}
