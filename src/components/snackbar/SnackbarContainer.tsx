import React from 'react';
import style from './snackbar.module.scss';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/store.interface';
import { createPortal } from 'react-dom';
import Snackbar from './Snackbar';
import { utilsActions } from '../../redux/actions/utilsActions';

const portal = document.getElementById('portal-popup-alert');

export default function SnackbarContainer() {
    const messageList = useSelector((state: IStore) => state.utils.message);

    if (!portal) return <></>;
    if (!messageList) return <></>;

    return createPortal(
        <div className={style['snackbarContainer']}>
            {messageList.map((item, i) => (
                <Snackbar key={i} message={item.message} status={0} onClose={() => utilsActions.deleteMessage(i)} />
            ))}
        </div>,
        portal,
    );
}
