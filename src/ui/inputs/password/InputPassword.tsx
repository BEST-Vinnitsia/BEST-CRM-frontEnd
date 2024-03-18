import React, { useRef, useState } from 'react';
import style from './inputPassword.module.scss';
import { js } from '../../../helpers';
import { SvgHiddenPassword, SvgVisiblePassword } from '../../../assets/svg';

interface IProps {
    label: string;
    value: string;
    error?: boolean;
    setValue: (data: string) => void;
    name?: string;
}

export default function InputPassword({ label, setValue, value, error, name }: IProps) {
    const inputFieldRef = useRef<HTMLInputElement>(null);
    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

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

    const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setViewPassword((prev) => !prev);
    };

    return (
        <div
            onClick={() => {
                inputFieldRef.current && inputFieldRef.current.focus();
            }}
            className={js(
                style['inputPassword'],
                focus ? style['inputPassword--focus'] : '',
                value !== '' ? style['inputPassword--change'] : '',
                error && visited && !focus ? style['inputPassword--error'] : '',
                error && visited && focus ? style['inputPassword--error-focus'] : '',
            )}
        >
            <label className={style['inputPassword__label']}>{label}</label>

            <div className={style['inputPassword__fieldContainer']}>
                <input
                    ref={inputFieldRef}
                    className={style['inputPassword__fieldContainer-field']}
                    value={value}
                    onChange={onChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    type={viewPassword ? 'text' : 'password'}
                    name={name}
                    autoComplete="off"
                />
            </div>

            <div className={style['inputPassword__buttonContainer']}>
                <button className={style['inputPassword__buttonContainer-button']} onClick={(e) => togglePassword(e)}>
                    <div className={style['inputPassword__buttonContainer-button-svg']}>
                        {viewPassword ? <SvgVisiblePassword /> : <SvgHiddenPassword />}
                    </div>
                </button>
            </div>
        </div>
    );
}
