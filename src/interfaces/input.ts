export interface IInputHookRes {
    name: string;
    required: boolean;
    value: string;
    error: boolean;
    errorText: string;
    setValue: (data: string) => void;
}

export interface IInputProps extends IInputMainProps {
    placeholder: string;
}

export interface IInputHookProps {
    placeholder: string;
    hook: IInputMainProps;
}

interface IInputMainProps {
    value: string;
    errorText: string;
    error: boolean;
    setValue: (data: string) => void;
}
