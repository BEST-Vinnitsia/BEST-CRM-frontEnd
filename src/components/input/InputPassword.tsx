import React, { useState } from 'react';
import style from './inputPassword.module.scss';
import { IInputHookProps, IInputProps } from '../../interfaces/input';
import CircleButton from '../button/CircleButton';
import { SvgHiddenPassword, SvgVisiblePassword } from '../../assets/svg';

type InputProps = IInputProps | IInputHookProps;

export default function InputPassword(props: InputProps) {
    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);
    const [visible, setVisible] = useState(false);
    const isPropsHook = 'hook' in props;
    //
    const placeholder = props.placeholder;
    const value = isPropsHook ? props.hook.value : props.value;
    const errorText = isPropsHook ? props.hook.errorText : props.errorText;
    const error = isPropsHook ? props.hook.error : props.error;
    const setValue = isPropsHook ? props.hook.setValue : props.setValue;

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
            className={style['inputPassword']}
            data-error={visited && error ? '1' : '0'}
            data-focus={focus ? '1' : '0'}
            data-change={value !== '' ? '1' : '0'}
        >
            <label className={style['inputPassword__label']}>{placeholder}</label>

            <div className={style['inputPassword__container']}>
                <input
                    className={style['inputPassword__container__input']}
                    type={visible ? 'text' : 'password'}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
                    value={value}
                    autoComplete="off"
                />

                <div className={style['inputPassword__container__button']}>
                    <CircleButton
                        svg={visible ? <SvgVisiblePassword /> : <SvgHiddenPassword />}
                        onClick={visibleHandler}
                    />
                </div>

                <fieldset className={style['inputPassword__container__fieldset']}>
                    <legend className={style['inputPassword__container__fieldset__legend']}>
                        <span className={style['inputPassword__container__fieldset__legend__placeholder']}>
                            {placeholder}
                        </span>
                    </legend>
                </fieldset>
            </div>

            {visited && error && errorText !== '' && (
                <span className={style['inputPassword__errorText']}>{errorText}</span>
            )}
        </div>
    );
}
