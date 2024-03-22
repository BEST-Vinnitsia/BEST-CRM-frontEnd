import React from 'react';
import style from './cardEvent.module.scss';
import { js } from '../../../helpers';
import { ImgJFLogo } from '../../../assets/img';

interface IProps {
    title?: string;
    subtitle?: string;
    svg?: React.ReactNode;
    imgUrl?: string;
    onClick?: () => void;
}

export default function CardEvent({ title, subtitle, svg, imgUrl, onClick }: IProps) {
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
                <img src={ImgJFLogo} alt={'img'} />
            </div>

            <div className={style['cardEvent__text']}>
                <span className={style['cardEvent__text-title']}>{'Job Fair'}</span>
                <span className={style['cardEvent__text-subtitle']}>{'subtitle'}</span>
                {/*{subtitle && <span className={style['cardEvent__text-subtitle']}>{subtitle}</span>}*/}
            </div>
        </div>
    );
}
