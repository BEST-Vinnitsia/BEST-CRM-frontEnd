import React from 'react';
import style from './breadcrumbs.module.scss';

interface IProps {
    path: IPath[];
    children?: React.ReactNode;
}

interface IPath {
    url: string;
    title: string;
}

export default function BreadcrumbsContainer({ children, path }: IProps) {
    return (
        <div className={style['breadcrumbsContainer']}>
            <div className={style['breadcrumbsContainer__textContainer']}>
                <h1 className={style['breadcrumbsContainer__textContainer__pageTitle']}>Title</h1>

                <nav className={style['breadcrumbsContainer__textContainer__breadcrumbs']}>
                    <ol className={style['breadcrumbsContainer__textContainer__breadcrumbs__listContainer']}>
                        {path.map((item, i) => {
                            console.log(path);
                            console.log(i);

                            return (
                                <React.Fragment key={i}>
                                    {i !== 0 && (
                                        <li
                                            className={
                                                style[
                                                    'breadcrumbsContainer__textContainer__breadcrumbs__listContainer__list'
                                                ]
                                            }
                                        >
                                            /
                                        </li>
                                    )}
                                    <li
                                        className={
                                            style[
                                                'breadcrumbsContainer__textContainer__breadcrumbs__listContainer__rout'
                                            ]
                                        }
                                        data-here={path.length - 1 === i ? '1' : '0'}
                                    >
                                        {item.title}
                                    </li>
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
