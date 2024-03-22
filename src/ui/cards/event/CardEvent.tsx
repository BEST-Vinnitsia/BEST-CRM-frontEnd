import React from 'react';
import style from './cardEvent.module.scss';
import { js } from '../../../helpers';

interface IProps {
    title?: string;
    subtitle?: string;
    imgUrl?: string;
    onClick?: () => void;
}

export default function CardEvent({ title, subtitle, imgUrl, onClick }: IProps) {
    return (
        <div
            className={js(
                style['cardEvent'], //
                onClick ? style['cardEvent--click'] : '',
                style['cardEvent--blue-radial'],
            )}
            onClick={onClick}
        >
            <div className={style['cardEvent__img']}>
                <img src={imgUrl} alt={'img'} />
            </div>

            <div className={style['cardEvent__text']}>
                <span className={style['cardEvent__text-title']}>{title}</span>
                {subtitle && <span className={style['cardEvent__text-subtitle']}>{subtitle}</span>}
            </div>
        </div>
    );
}
