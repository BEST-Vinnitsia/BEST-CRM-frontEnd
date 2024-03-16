import React from 'react';
import style from './breadcrumbs.module.scss';
import { useNavigate } from 'react-router-dom';
import { js } from '../../helpers';

interface IProps {
    path: {
        url: string;
        title: string;
    }[];
    children?: React.ReactNode;
    column?: boolean;
}

export default function Breadcrumbs({ path, children, column }: IProps) {
    const navigate = useNavigate();

    return (
        <div className={js(style['breadcrumbs'], style[`breadcrumbs--${column ? 'column' : ''}`])}>
            <nav className={style['breadcrumbs__nav']}>
                <ol className={style['breadcrumbs__nav-list']}>
                    {path.map((item, i) => (
                        <React.Fragment key={i}>
                            {i !== 0 && (
                                <li
                                    className={js(
                                        style['breadcrumbs__nav-list-item'],
                                        style['breadcrumbs__nav-list-item--separator'],
                                    )}
                                >
                                    {'/'}
                                </li>
                            )}

                            <li
                                className={js(
                                    style['breadcrumbs__nav-list-item'],
                                    path.length - 1 !== i ? style['breadcrumbs__nav-list-item--active'] : '',
                                )}
                                onClick={() => navigate(item.url)}
                            >
                                {item.title}
                            </li>
                        </React.Fragment>
                    ))}
                </ol>
            </nav>

            <div className={style['breadcrumbs__buttons']}>{children}</div>
        </div>
    );
}
