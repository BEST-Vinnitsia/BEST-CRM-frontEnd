import React, { useRef, useState } from 'react';
import style from './input.module.scss';
import { js } from '../../../helpers';

interface IProps {
    label: string;
    value: string;
    error?: boolean;
    setValue: (data: string) => void;
    svg?: React.ReactNode;
    name?: string;
}

export default function Input({ label, setValue, value, error, svg, name }: IProps) {
    const inputFieldRef = useRef<HTMLInputElement>(null);
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
            onClick={() => {
                inputFieldRef.current && inputFieldRef.current.focus();
            }}
            className={js(
                style['input'],
                svg ? style['input--svg'] : '',
                focus ? style['input--focus'] : '',
                value !== '' ? style['input--change'] : '',
                error && visited && !focus ? style['input--error'] : '',
                error && visited && focus ? style['input--error-focus'] : '',
            )}
        >
            <label className={style['input__label']}>{label}</label>

            <div className={style['input__fieldContainer']}>
                <input
                    ref={inputFieldRef}
                    className={style['input__fieldContainer-field']}
                    value={value}
                    onChange={onChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    type={'text'}
                    name={name}
                    autoComplete="off"
                />
            </div>

            <div className={style['input__svgContainer']}>
                <div className={style['input__svgContainer-svg']}>{svg}</div>
            </div>
        </div>
    );
}
