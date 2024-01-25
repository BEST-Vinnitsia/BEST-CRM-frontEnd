import React, { useEffect, useRef } from 'react';
import style from './snackbar.module.scss';
import { SvgClose, SvgError, SvgInfo, SvgSuccess, SvgWarn } from '../../assets/svg';
import { IUtilsStoreMessage } from '../../interfaces/store';
import { joinStyle } from '../../utils/joinClassName';
import { motion } from 'framer-motion';

interface IProps extends Pick<IUtilsStoreMessage, 'message' | 'status'> {
    onClose: () => void;
}

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

const animations = {
    layout: true,
    initial: { translateX: '110%' },
    animate: { translateX: 0 },
    exit: { translateX: '110%' },
    transition,
};

export default function Snackbar({ message, status, onClose }: IProps) {
    const timerRef = useRef<NodeJS.Timeout>();

    const startTimer = () => {
        timerRef.current = setTimeout(() => {
            onClose();
        }, 1000 * 3);
    };

    const clearTimer = () => {
        clearTimeout(timerRef.current);
    };

    useEffect(() => {
        startTimer();

        return () => {
            clearTimer();
        };
    }, []);

    const setSvg = () => {
        if (status === 'info') return <SvgInfo />;
        if (status === 'success') return <SvgSuccess />;
        if (status === 'warn') return <SvgWarn />;
        if (status === 'error') return <SvgError />;
        return <></>;
    };

    return (
        <motion.div
            {...animations}
            className={joinStyle(style['snack'], style[`snack-${status}`])}
            onMouseLeave={startTimer}
            onMouseEnter={clearTimer}
        >
            <div className={style['snack__svgBlock']}>
                <span className={style['snack__svgBlock__container']}>
                    <span className={style['snack__svgBlock__container__svg']}>{setSvg()}</span>
                </span>
            </div>
            <span className={style['snack__message']}>{message}</span>
            <div className={style['snack__buttonBlock']}>
                <button className={style['snack__buttonBlock__button']} onClick={onClose}>
                    <span className={style['snack__buttonBlock__button__svg']}>
                        <SvgClose />
                    </span>
                </button>
            </div>
        </motion.div>
    );
}
