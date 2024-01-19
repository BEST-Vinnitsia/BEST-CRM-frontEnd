import React, { useEffect, useRef } from 'react';
import style from './snackbar.module.scss';
import { SvgClose, SvgError, SvgInfo, SvgSuccess, SvgWarn } from '../../assets/svg';

interface IProps {
    code: number;
    message: string;
    onClose: () => void;
}

export default function Snackbar({ message, code, onClose }: IProps) {
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
    }, []);

    const setSvg = () => {
        if (code === 0) return <SvgInfo />;
        if (code === 1) return <SvgSuccess />;
        if (code === 2) return <SvgWarn />;
        if (code === 3) return <SvgError />;
        return <></>;
    };

    return (
        <div className={style['snackbarContainer__alert']} onMouseLeave={startTimer} onMouseEnter={clearTimer}>
            <div className={style['snackbarContainer__alert__svgBlock']} data-code={`${code}`}>
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
