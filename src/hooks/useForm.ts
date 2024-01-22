import React from 'react';
import { IInputHookRes } from '../interfaces/input';

export const useForm = (fields: IInputHookRes[]) => {
    const formObject = fields.reduce((acc, field) => {
        acc[field.name] = field;
        return acc;
    }, {} as Record<string, IInputHookRes>);

    return formObject;
};
