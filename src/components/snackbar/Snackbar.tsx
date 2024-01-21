import React, { useEffect, useRef } from 'react';
import style from './snackbar.module.scss';
import { SvgClose, SvgError, SvgInfo, SvgSuccess, SvgWarn } from '../../assets/svg';
import { IUtilsStoreMessage } from '../../interfaces/store';

interface IProps extends Pick<IUtilsStoreMessage, 'message' | 'status'> {
    onClose: () => void;
}

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
        <div className={style['snackbarContainer__alert']} onMouseLeave={startTimer} onMouseEnter={clearTimer}>
            <div className={style['snackbarContainer__alert__svgBlock']} data-code={`${status}`}>
                <span className={style['snackbarContainer__alert__svgBlock__container']}>
                    <span className={style['snackbarContainer__alert__svgBlock__container__svg']}>{setSvg()}</span>
                </span>
            </div>
            <span className={style['snackbarContainer__alert__message']}>{message}</span>
            <div className={style['snackbarContainer__alert__buttonBlock']}>
                <button className={style['snackbarContainer__alert__buttonBlock__button']} onClick={onClose}>
                    <span className={style['snackbarContainer__alert__buttonBlock__button__svg']}>
                        <SvgClose />
                    </span>
                </button>
            </div>
        </div>
    );
}
