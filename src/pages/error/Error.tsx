import React from 'react';
import style from './error.page.module.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_ERROR, PATH_HOME } from '../../routes/paths';
import { SvgArrow } from '../../assets/svg';
import { Button } from '../../components';

export default function ErrorPage() {
    const { code } = useParams();
    const navigate = useNavigate();

    const text = {
        403: {
            title: 'No permission',
            description:
                'The page you`re trying access has restricted access. Please refer to your system administrator',
        },
        404: {
            title: 'Sorry, Page Not Found!',
            description:
                'Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.',
        },
        500: {
            title: '500 Internal Server Error',
            description: 'There was an error, please try again later.',
        },
    };

    if (!code) return <Navigate to={PATH_HOME.ROOT} />;
    const codeString = code as '403' | '404' | '500';

    if (codeString !== '403' && codeString !== '404' && codeString !== '500') return <Navigate to={PATH_ERROR[404]} />;

    return (
        <div className={style['errorPage']}>
            <div className={style['errorPage__item_1']} />
            <div className={style['errorPage__item_2']} />
            <div className={style['errorPage__blur']} />

            <div className={style['errorPage__container']}>
                <div className={style['errorPage__container__codeError']}>{codeString}</div>
                <div className={style['errorPage__container__title']}>{text[codeString].title}</div>
                <div className={style['errorPage__container__description']}>{text[codeString].description}</div>

                <Button onClick={() => navigate(PATH_HOME.ROOT)} svg={<SvgArrow />} title="To home" />
            </div>
        </div>
    );
}
