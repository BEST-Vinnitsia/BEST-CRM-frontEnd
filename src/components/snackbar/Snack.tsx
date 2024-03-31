import React, { useEffect, useRef } from 'react';
import style from './snackbar.module.scss';
import { SvgClose, SvgError, SvgInfoAlert, SvgSuccess, SvgWarn } from '../../assets/svg';
import { IUtilsStoreMessage } from '../../interfaces/redux/store';
import { joinStyle } from '../../utils/';
import { motion } from 'framer-motion';
import { animationLayoutTranslateX } from '../../styles/animationConfig';

interface IProps extends Pick<IUtilsStoreMessage, 'message' | 'status'> {
    onClose: () => void;
}

export default function Snack({ message, status, onClose }: IProps) {
    const timerRef = useRef<NodeJS.Timeout>();

    const startTimer = () => {
        timerRef.current = setTimeout(() => {
            onClose();
        }, 1000 * 5);
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
        if (status === 'info') return <SvgInfoAlert />;
        if (status === 'success') return <SvgSuccess />;
        if (status === 'warn') return <SvgWarn />;
        if (status === 'error') return <SvgError />;
        return <></>;
    };

    return (
        <motion.div
            {...animationLayoutTranslateX}
            className={joinStyle(style['snack'], style[`snack--${status}`])}
            onMouseLeave={startTimer}
            onMouseEnter={clearTimer}
        >
            <div className={style['snack__svgBlock']}>
                <span className={style['snack__svgBlock-container']}>
                    <span className={style['snack__svgBlock-container-svg']}>{setSvg()}</span>
                </span>
            </div>
            <span className={style['snack__message']}>{message}</span>
            <div className={style['snack__buttonBlock']}>
                <button className={style['snack__buttonBlock-button']} onClick={onClose}>
                    <span className={style['snack__buttonBlock-button-svg']}>
                        <SvgClose />
                    </span>
                </button>
            </div>
        </motion.div>
    );
}
