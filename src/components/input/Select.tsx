import React, { useRef, useState } from 'react';
import style from './select.module.scss';
import { joinStyle } from '../../utils/joinClassName';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import CircleButton from '../button/CircleButton';
import { SvgArrowBottom, SvgArrowTop } from '../../assets/svg';

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition,
};

export default function Select() {
    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);
    const [value, setValue] = useState('');
    const selectMenuRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);
    const selectButtonRef = useRef<HTMLButtonElement>(null);

    const onFocusHandler = () => {
        setFocus(true);
    };

    const onBlurHandler = () => {
        setVisited(true);
        setFocus(false);
        if (selectRef.current) {
            selectRef.current.blur();
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useOutsideClick({
        elementRef: selectMenuRef,
        triggerArrayRef: [selectRef, selectButtonRef],
        handler: onBlurHandler,
        enable: focus,
    });

    const error = false;

    return (
        <>
            <div
                className={joinStyle(
                    style['select'],
                    style[`select--error-${visited && error}`],
                    style[`select--focus-${focus}`],
                    style[`select--change-${value !== ''}`],
                )}
            >
                <div className={style['select__wrapper']}>
                    <label className={style['select__wrapper-label']}>{'placeholder'}</label>

                    <div className={style['select__wrapper-container']}>
                        <input
                            ref={selectRef}
                            type="text"
                            onFocus={onFocusHandler}
                            onChange={onChangeHandler}
                            value={value}
                            autoComplete="off"
                        />

                        <div className={style['select__wrapper-container-button']}>
                            <CircleButton
                                elementRef={selectButtonRef}
                                svg={focus ? <SvgArrowTop /> : <SvgArrowBottom />}
                                onClick={focus ? onBlurHandler : onFocusHandler}
                            />
                        </div>

                        <fieldset>
                            <legend>
                                <span>{'placeholder'}</span>
                            </legend>
                        </fieldset>
                    </div>

                    <AnimatePresence>
                        {focus && (
                            <motion.div
                                ref={selectMenuRef}
                                className={style['select__wrapper-selectContainer']}
                                {...animations}
                            >
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                                <button className={style['select__wrapper-selectContainer-button']}>asd</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* {visited && error && errorText !== '' && <span className={style['select__errorText']}>{errorText}</span>} */}
            </div>
        </>
    );
}
