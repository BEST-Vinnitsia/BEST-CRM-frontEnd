import React from 'react';
import style from './tab.module.scss';
import { js } from '../../helpers';

interface IProps {
    tabs:
        | {
              title: string;
              svg?: React.ReactNode;
          }[]
        | [];
    onClick: (data: string) => void;
    value: string;
}

export default function Tab({ tabs, onClick, value }: IProps) {
    return (
        <div className={style['tab']}>
            {tabs.map((item, i) => (
                <span
                    key={i}
                    className={js(style['tab__item'], value === item.title ? style['tab__item--active'] : '')}
                    onClick={() => onClick(item.title)}
                >
                    {item.svg && <span className={style['tab__item-svg']}>{item.svg}</span>}
                    <span className={style['tab__item-title']}>{item.title}</span>
                </span>
            ))}
        </div>
    );
}
