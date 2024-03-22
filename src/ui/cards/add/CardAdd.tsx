import React from 'react';
import style from './cardAdd.module.scss';
import { js } from '../../../helpers';
import { SvgAdd, SvgAddLine } from '../../../assets/svg';

interface IProps {
    title?: string;
    onClick?: () => void;
}

export default function CardAdd({ title = 'Add new', onClick }: IProps) {
    return (
        <div
            className={js(
                style['cardMember'], //
                onClick ? style['cardMember--click'] : '',
            )}
            onClick={onClick}
        >


            <span className={style['cardMember__itemColor']} />
            <span className={style['cardMember__blurItemColor']} />

            <span className={style['cardMember__itemFirst']} />
            <span className={style['cardMember__item']} />
            <span className={style['cardMember__itemLine']}>
                <SvgAddLine />
            </span>

            <div className={style['cardMember__svg']}>
                <SvgAdd />
            </div>

            <div className={style['cardMember__bg']} />

            <span className={style['cardMember__title']}>{title}</span>
        </div>
    );
}
