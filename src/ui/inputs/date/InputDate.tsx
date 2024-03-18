import React, { useState } from 'react';
import style from './inputDate.module.scss';
import { js } from '../../../helpers';

interface IProps {
    label: string;
    value: string;
    error?: boolean;
    setValue: (data: string) => void;
    name?: string;
}

export default function InputDate({ label, setValue, value, error, name }: IProps) {
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
            className={js(
                style['input'],
                style['input--change'],
                focus ? style['input--focus'] : '',
                error && visited && !focus ? style['input--error'] : '',
                error && visited && focus ? style['input--error-focus'] : '',
            )}
        >
            <label className={style['input__label']}>{label}</label>

            <div className={style['input__fieldContainer']}>
                <input
                    className={style['input__fieldContainer-field']}
                    onChange={onChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    type={'date'}
                    name={name}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}
