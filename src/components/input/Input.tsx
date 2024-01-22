import React, { useEffect, useState } from 'react';
import style from './input.module.scss';
import { IInputHookProps, IInputProps } from '../../interfaces/input';

type InputProps = IInputProps | IInputHookProps;

export default function Input(props: InputProps) {
    const [focus, setFocus] = useState(false);
    const isPropsHook = 'hook' in props;
    //
    const placeholder = props.placeholder;
    const value = isPropsHook ? props.hook.value : props.value;
    const name = isPropsHook ? props.hook.name : props.name;
    const errorText = isPropsHook ? props.hook.errorText : props.errorText;
    const error = isPropsHook ? props.hook.error : props.error;
    const setValue = isPropsHook ? props.hook.setValue : props.setValue;
    const setVisited = isPropsHook ? props.hook.setVisited : props.setVisited;

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

    return (
        <div
            className={style['input']}
            data-error={error ? '1' : '0'}
            data-focus={focus ? '1' : '0'}
            data-change={value !== '' ? '1' : '0'}
        >
            <label className={style['input__label']}>{placeholder}</label>

            <div className={style['input__container']}>
                <input
                    className={style['input__container__input']}
                    type="text"
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
                    name={name}
                    value={value}
                    autoComplete="off"
                />

                <fieldset className={style['input__container__fieldset']}>
                    <legend className={style['input__container__fieldset__legend']}>
                        <span className={style['input__container__fieldset__legend__placeholder']}>{placeholder}</span>
                    </legend>
                </fieldset>
            </div>

            {error && errorText !== '' && <span className={style['input__errorText']}>{errorText}</span>}
        </div>
    );
}
