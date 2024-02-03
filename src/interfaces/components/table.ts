import { IInputHookRes } from './input';
import { ISelectHookRes } from './select';

export interface ITableHead {
    title?: string;
    contentType?: 'checkBox' | 'string' | 'number' | 'date';
}

export interface ITableBody {
    name?: string;
    contentType?: 'checkBox' | 'string' | 'number' | 'date' | 'label';
}
