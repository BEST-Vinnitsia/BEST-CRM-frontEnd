import { useEffect, useState } from 'react';
import { ISelectHookRes } from '../interfaces/components/select';

interface IProps {
    name: string;
    required?: boolean;
}

export const useSelect = ({ name, required = false }: IProps): ISelectHookRes => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(true);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if (!required) {
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
