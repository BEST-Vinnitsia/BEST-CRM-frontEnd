import React from 'react';
import style from './sidebarButton.module.scss';
import { SvgMenu } from '../../assets/svg';
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

    return (
        <a className={style['sidebarButton']} onClick={redirect}>
            <div
                className={style['sidebarButton__container']}
                data-active={location.pathname === props.path ? '1' : '0'}
            >
                <span className={style['sidebarButton__container__svg']}>{props.svg}</span>
                <span className={style['sidebarButton__container__textContainer']}>
                    <span className={style['sidebarButton__container__textContainer__text']}>{props.title}</span>
                </span>
            </div>
        </a>
    );
}
