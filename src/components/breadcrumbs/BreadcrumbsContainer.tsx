import React from 'react';
import style from './breadcrumbs.module.scss';
import { useNavigate } from 'react-router-dom';
import { joinStyle } from '../../utils/joinClassName';

interface IProps {
    path: IPath[];
    title: string;
    children?: React.ReactNode;
}

interface IPath {
    url: string;
    title: string;
}

export default function BreadcrumbsContainer({ children, path, title }: IProps) {
    const navigate = useNavigate();

    return (
        <div className={style['breadcrumbs']}>
            <div className={style['breadcrumbs__textBlock']}>
                <h1 className={style['breadcrumbs__textBlock-title']}>{title}</h1>

                <nav className={style['breadcrumbs__textBlock-breadcrumb']}>
                    <ol className={style['breadcrumbs__textBlock-breadcrumb-listBlock']}>
                        {path.map((item, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {i !== 0 && (
                                        <li className={style['breadcrumbs__textBlock-breadcrumb-listBlock-list']}>/</li>
                                    )}

                                    <li
                                        onClick={() => path.length - 1 !== i && navigate(item.url)}
                                        className={joinStyle(
                                            style['breadcrumbs__textBlock-breadcrumb-listBlock-rout'],
                                            style[
                                                `breadcrumbs__textBlock-breadcrumb-listBlock-rout--${
                                                    path.length - 1 === i ? 'disable' : 'active'
                                                }`
                                            ],
                                        )}
                                    >
                                        {item.title}
                                    </li>
                                </React.Fragment>
                            );
                        })}
                    </ol>
                </nav>
            </div>

            <div>{children}</div>
        </div>
    );
}
