import React, { useState } from 'react';
import style from './input.module.scss';
import { IInputHookProps } from '../../interfaces/components/input';
import { joinStyle } from '../../utils/';

export default function Input({ placeholder, hookProps }: IInputHookProps) {
    const { value, setValue, error, errorText } = hookProps;

    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);

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
