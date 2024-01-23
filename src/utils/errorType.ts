import { IError } from '../interfaces/error';

export const setErrorType = (obj: any) => {
    if (obj && typeof obj === 'object') {
        if ('error' in obj && 'message' in obj && 'statusCode' in obj) {
            return obj as IError;
        }
    }
};

export const checkErrorType = (obj: any): obj is IError => {
    if (obj && typeof obj === 'object') {
        if ('error' in obj && 'message' in obj && 'statusCode' in obj) {
            return true;
        }
    }
    return false;
};
