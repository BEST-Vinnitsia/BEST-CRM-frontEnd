import React from 'react';
import style from './cardMemebr.module.scss';

interface IProps {
    title: string;
    subtitle?: string;
    svg?: React.ReactNode;
    imgUrl?: string;
}

export default function CardMember({ title, subtitle, svg, imgUrl }: IProps) {
    return (
        <div className={style['cardMember']}>
            {imgUrl && <div className={style['cardMember__img']}>
                <img src={imgUrl} alt={'img'} />
            </div>}

            {svg && <div className={style['cardMember__svg']}>{svg}</div>}

            <div className={style['cardMember__bg']} />

            <div className={style['cardMember__text']}>
                <span className={style['cardMember__text-title']}>{title}</span>
                {subtitle && <span className={style['cardMember__text-subtitle']}>{subtitle}</span>}
            </div>
        </div>
    );
}
