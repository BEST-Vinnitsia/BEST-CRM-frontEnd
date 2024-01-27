import React, { useEffect, useState } from 'react';
import { IInputHookRes } from '../interfaces/components/input';

export const useForm = (fields: IInputHookRes[]): [Record<string, IInputHookRes>, boolean] => {
    const [isValid, setIsValid] = useState(false);

    const formObject = fields.reduce((acc, field) => {
        acc[field.name] = field;
        return acc;
    }, {} as Record<string, IInputHookRes>);

    useEffect(() => {
        const isFormValid = Object.values(formObject).every((field) => {
            if (field.error === true) return false;
            if (field.error === false) return true;
        });

        setIsValid(isFormValid);
    }, [fields]);

    return [formObject, isValid];
};
