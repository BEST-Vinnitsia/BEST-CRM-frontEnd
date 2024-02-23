import React from 'react';
import style from './breadcrumbs.module.scss';
import { useNavigate } from 'react-router-dom';
import { joinStyle } from '../../utils/';
import { Button } from '../index';

interface IProps {
    path: IPath[];
    buttons?: { path: string; title: string }[] | [];
    children?: React.ReactNode;
}

interface IPath {
    url: string;
    title: string;
}

export default function BreadcrumbsContainer({ buttons, path, children }: IProps) {
    const navigate = useNavigate();

    return (
        <div className={style['breadcrumbs']}>
            <nav className={style['breadcrumbs__breadcrumb']}>
                <ol className={style['breadcrumbs__breadcrumb-listBlock']}>
                    {path.map((item, i) => (
                        <React.Fragment key={i}>
                            {i !== 0 && <li className={style['breadcrumbs__breadcrumb-listBlock-list']}>/</li>}

                            <li
                                onClick={() => path.length - 1 !== i && navigate(item.url)}
                                className={joinStyle(
                                    style['breadcrumbs__breadcrumb-listBlock-rout'],
                                    style[`breadcrumbs__breadcrumb-listBlock-rout--visiting-${path.length - 1 === i}`],
                                )}
                            >
                                {item.title}
                            </li>
                        </React.Fragment>
                    ))}
                </ol>
            </nav>

            <div className={style['breadcrumbs__buttons']}>
                {children}
                {buttons &&
                    buttons.map((item, i) => <Button key={i} onClick={() => navigate(item.path)} title={item.title} />)}
            </div>
        </div>
    );
}
