import React from 'react';
import style from './breadcrumbs.module.scss';
import { useNavigate } from 'react-router-dom';
import { joinStyle } from '../../utils/joinClassName';

interface IProps {
    path: IPath[];
    children?: React.ReactNode;
}

interface IPath {
    url: string;
    title: string;
}

export default function BreadcrumbsContainer({ children, path }: IProps) {
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

            <div>{children}</div>
        </div>
    );
}
