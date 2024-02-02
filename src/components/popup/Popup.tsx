import React from 'react';
import style from './popup.module.scss';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { animationOpacity } from '../../styles/animationConfig';

interface IProps {
    children?: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
    sx?: {
        h?: string;
        maxH?: string;
        minH?: string;
        w?: string;
        maxW?: string;
        minW?: string;
        p?: string;
    };
}

const portal = document.getElementById('portal');

const Popup = ({ children, onClose, isOpen, sx }: IProps) => {
    if (!portal) return <></>;

    sx = {
        h: sx && sx.h ? sx.h : undefined,
        maxH: sx && sx.maxH ? sx.maxH : '100dvh',
        minH: sx && sx.minH ? sx.minH : '100px',
        w: sx && sx.w ? sx.w : undefined,
        maxW: sx && sx.maxW ? sx.maxW : '500px',
        minW: sx && sx.minW ? sx.minW : '310px',
        p: sx && sx.p ? sx.p : undefined,
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div className={style['popup']} {...animationOpacity}>
                    <div
                        className={style['popup__content']}
                        style={{
                            height: sx?.h,
                            maxHeight: sx?.maxH,
                            minHeight: sx?.minH,
                            width: sx?.w,
                            maxWidth: sx?.maxW,
                            minWidth: sx?.minW,
                            padding: sx?.p,
                        }}
                    >
                        {children}
                    </div>

                    <div className={style['popup__bg']} onClick={onClose} />
                </motion.div>
            )}
        </AnimatePresence>,
        portal,
    );
};

export default Popup;
