import React from 'react';
import style from './snackbar.module.scss';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/redux/store';
import { createPortal } from 'react-dom';
import Snack from './Snack';
import { utilsActions } from '../../redux/actions/utilsActions';
import { AnimatePresence } from 'framer-motion';

const portal = document.getElementById('portal');

export default function Snackbar() {
    const messageList = useSelector((state: IStore) => state.utils.message);

    if (!portal) return <></>;
    if (!messageList) return <></>;

    return createPortal(
        <>
            {messageList.length !== 0 && (
                <div className={style['snackbar']}>
                    {/*  */}
                    <AnimatePresence>
                        {messageList.slice(0, 5).map((item) => (
                            <Snack
                                key={item.id}
                                message={item.message}
                                status={item.status}
                                onClose={() => {
                                    utilsActions.deleteMessage(item.id);
                                }}
                            />
                        ))}
                    </AnimatePresence>
                    {/*  */}
                </div>
            )}
        </>,
        portal,
    );
}
