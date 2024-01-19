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
            {messageList.map((item, i) => {
                if (i < 5) {
                    return (
                        <Snackbar
                            key={item.id}
                            message={item.message}
                            code={item.code}
                            onClose={() => utilsActions.deleteMessage(item.id)}
                        />
                    );
                }
                return null;
            })}
        </div>,
        portal,
    );
}
