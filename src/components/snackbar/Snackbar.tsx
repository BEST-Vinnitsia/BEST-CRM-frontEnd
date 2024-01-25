import React from 'react';
import style from './snackbar.module.scss';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/store';
import { createPortal } from 'react-dom';
import Snack from './Snack';
import { utilsActions } from '../../redux/actions/utilsActions';
import { AnimatePresence, motion } from 'framer-motion';

const portal = document.getElementById('portal-popup-alert');

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

const animations = {
    initial: { translateX: '110%' },
    animate: { translateX: 0 },
    exit: { translateX: '110%' },
    transition,
};

export default function Snackbar() {
    const messageList = useSelector((state: IStore) => state.utils.message);

    if (!portal) return <></>;
    if (!messageList) return <></>;

    return createPortal(
        <AnimatePresence>
            {messageList.length !== 0 && (
                <motion.div className={style['snackbar']} {...animations}>
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
                </motion.div>
            )}
        </AnimatePresence>,
        portal,
    );
}
