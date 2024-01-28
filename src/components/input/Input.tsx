import React, { useState } from 'react';
import style from './input.module.scss';
import { IInputHookProps, IInputProps } from '../../interfaces/components/input';
import { joinStyle } from '../../utils/';

export default function Input(props: IInputProps | IInputHookProps) {
    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);
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

    return (
        <div
            className={joinStyle(
                style['input'],
                style[`input--error-${visited && error}`],
                style[`input--focus-${focus}`],
                style[`input--change-${value !== ''}`],
            )}
        >
            <label className={style['input__label']}>{placeholder}</label>

            <div className={style['input__container']}>
                <input
                    type="text"
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
                    value={value}
                    autoComplete="off"
                />

                <fieldset>
                    <legend>
                        <span>{placeholder}</span>
                    </legend>
                </fieldset>
            </div>

            {visited && error && errorText !== '' && <span className={style['input__errorText']}>{errorText}</span>}
        </div>
    );
}
