import React from 'react';
import style from './sidebarButton.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

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
        <a className={style['sidebarButton']} onClick={redirect}>
            <div className={style['sidebarButton__container']} data-active={checkPath() ? '1' : '0'}>
                <span className={style['sidebarButton__container__svg']}>{props.svg}</span>
                <span className={style['sidebarButton__container__textContainer']}>
                    <span className={style['sidebarButton__container__textContainer__text']}>{props.title}</span>
                </span>
            </div>
        </a>
    );
}
