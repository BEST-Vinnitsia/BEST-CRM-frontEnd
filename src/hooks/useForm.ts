import React, { useEffect, useState } from 'react';
import { IInputHookRes } from '../interfaces/components/input';
import { ISelectHookRes } from '../interfaces/components/select';

export const useForm = (
    fields: IInputHookRes[] | ISelectHookRes[],
): [Record<string, IInputHookRes | ISelectHookRes>, boolean] => {
    const [isValid, setIsValid] = useState(false);

    const formObject = fields.reduce(
        (acc, field) => {
            acc[field.name] = field;
            return acc;
        },
        {} as Record<string, IInputHookRes | ISelectHookRes>,
    );

    useEffect(() => {
        const isFormValid = Object.values(formObject).every((field) => {
            if (field.error === true) return false;
            if (field.error === false) return true;
        });

        setIsValid(isFormValid);
    }, [fields]);

    return [formObject, isValid];
};
