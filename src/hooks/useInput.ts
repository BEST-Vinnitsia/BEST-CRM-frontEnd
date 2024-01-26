import React, { useEffect, useState } from 'react';
import { IInputHookRes } from '../interfaces/components/input';

interface IProps {
    name: string;
    regExp?: RegExp;
    required?: boolean;
    exampleData?: string;
}

export const useInput = ({ name, required = false, regExp, exampleData }: IProps): IInputHookRes => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(true);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if (!required && !regExp) {
            setError(false);
        }
    }, []);

    useEffect(() => {
        if (required) {
            if (value === '' || value.trim() === '') {
                setError(true);
                setErrorText('this field is required');
            } else {
                setError(false);
                setErrorText('');
            }
        }

        if (regExp) {
            if (!regExp.test(value)) {
                setError(true);

                if (!(required && (value === '' || value.trim() === ''))) {
                    setErrorText(
                        exampleData ? `incorrect data entered. example: ${exampleData}` : 'incorrect data entered',
                    );
                }
            } else {
                setError(false);
                setErrorText('');
            }
        }
    }, [value]);

    return {
        name,
        required,

        value,
        setValue,

        error,
        errorText,
    };
};
