import React from 'react';
import style from './breadcrumbs.module.scss';
import { useNavigate } from 'react-router-dom';

interface IProps {
    path: IPath[];
    title: string;
    children?: React.ReactNode;
}

interface IPath {
    url: string;
    title: string;
}

const listContainerStyle = 'breadcrumbsContainer__textContainer__breadcrumbs__listContainer';

export default function BreadcrumbsContainer({ children, path, title }: IProps) {
    const navigate = useNavigate();

    return (
        <div className={style['breadcrumbsContainer']}>
            <div className={style['breadcrumbsContainer__textContainer']}>
                <h1 className={style['breadcrumbsContainer__textContainer__pageTitle']}>{title}</h1>

                <nav className={style['breadcrumbsContainer__textContainer__breadcrumbs']}>
                    <ol className={style[listContainerStyle]}>
                        {path.map((item, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {i !== 0 && <li className={style[`${listContainerStyle}__list`]}>/</li>}
                                    {path.length - 1 === i ? (
                                        <li className={style[`${listContainerStyle}__rout`]} data-here="1">
                                            {item.title}
                                        </li>
                                    ) : (
                                        <li
                                            className={style[`${listContainerStyle}__rout`]}
                                            data-here="0"
                                            onClick={() => navigate(item.url)}
                                        >
                                            {item.title}
                                        </li>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </ol>
                </nav>
            </div>

            <div className={style['breadcrumbsContainer__insertContainer']}>{children}</div>
        </div>
    );
}
