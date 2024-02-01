import React, { useState } from 'react';
import style from './inputPassword.module.scss';
import { IInputHookProps } from '../../interfaces/components/input';
import CircleButton from '../button/CircleButton';
import { SvgHiddenPassword, SvgVisiblePassword } from '../../assets/svg';
import { joinStyle } from '../../utils/';

export default function InputPassword({ placeholder, hookProps }: IInputHookProps) {
    const { value, setValue, errorText, error } = hookProps;

    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);
    const [visible, setVisible] = useState(false);

    const onFocusHandler = () => {
        setFocus(true);
    };

    const onBlurHandler = () => {
        setVisited(true);
        setFocus(false);
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const visibleHandler = () => {
        setVisible((prev) => !prev);
    };

    return (
        <div
            className={joinStyle(
                style['inputPassword'],
                style[`inputPassword--error-${visited && error}`],
                style[`inputPassword--focus-${focus}`],
                style[`inputPassword--change-${value !== ''}`],
            )}
        >
            <label className={style['inputPassword__label']}>{placeholder}</label>

            <div className={style['inputPassword__container']}>
                <input
                    type={visible ? 'text' : 'password'}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
                    value={value}
                    autoComplete="off"
                />

                <div className={style['inputPassword__container-button']}>
                    <CircleButton
                        svg={visible ? <SvgVisiblePassword /> : <SvgHiddenPassword />}
                        onClick={visibleHandler}
                    />
                </div>

                <fieldset>
                    <legend>
                        <span>{placeholder}</span>
                    </legend>
                </fieldset>
            </div>

            {visited && error && errorText !== '' && (
                <span className={style['inputPassword__errorText']}>{errorText}</span>
            )}
        </div>
    );
}
