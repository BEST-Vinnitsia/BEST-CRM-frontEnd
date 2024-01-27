import React from 'react';
import style from './error.page.module.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_ERROR, PATH_HOME } from '../../routes/paths';
import { SvgArrow } from '../../assets/svg';
import { Button } from '../../components';
import { joinStyle } from '../../utils/joinClassName';

const text = {
    403: {
        title: 'No permission',
        description: 'The page you`re trying access has restricted access. Please refer to your system administrator',
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

export default function ErrorPage() {
    const { code } = useParams();
    const navigate = useNavigate();

    if (!code) return <Navigate to={PATH_HOME.ROOT} />;
    const codeString = code as '403' | '404' | '500';

    if (codeString !== '403' && codeString !== '404' && codeString !== '500') return <Navigate to={PATH_ERROR[404]} />;

    return (
        <div className={joinStyle(style['error-page'], style[`error-page--${code}`])} data-code={codeString}>
            <div className={style['error-page__item-1']} />
            <div className={style['error-page__item-2']} />
            <div className={style['error-page__blur']} />

            <div className={style['error-container']}>
                <div className={style['error-container__code-error']}>{codeString}</div>
                <div className={style['error-container__title']}>{text[codeString].title}</div>
                <div className={style['error-container__description']}>{text[codeString].description}</div>

                <Button onClick={() => navigate(PATH_HOME.ROOT)} svg={<SvgArrow />} title="To home" />
            </div>
        </div>
    );
}
