import React, { useEffect, useState } from 'react';
import { IInputHookRes } from '../interfaces/input';

interface IProps {
    name: string;
    regExp?: RegExp;
    required?: boolean;
    exampleData?: string;
}

export const useInput = ({ name, required, regExp, exampleData }: IProps): IInputHookRes => {
    const [value, setValue] = useState('');
    const [visited, setVisited] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if (required && visited) {
            if (value === '' || value.trim() === '') {
                setError(true);
                setErrorText('this field is required');
            } else {
                setError(false);
                setErrorText('');
            }
        }

        if (regExp && visited) {
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
    }, [value, visited]);

    return {
        name,

        value,
        setValue,

        error,
        errorText,

        setVisited,
    };
};
