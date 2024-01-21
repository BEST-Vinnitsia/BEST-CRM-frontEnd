import React from 'react';
import style from './loader.module.scss';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/store';

export default function Loader() {
    const isLoading = useSelector((state: IStore) => state.utils.isLoading);

    if (!isLoading) return <></>;

    return (
        <div className={style['LoaderDefault-Container']}>
            <div className={style.LoaderDefault}>
                <span className={style.loader}>
                    <span className={style.firstLine} />
                    <span className={style.secondLine} />
                </span>
            </div>
        </div>
    );
}
