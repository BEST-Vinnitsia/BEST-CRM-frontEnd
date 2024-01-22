export interface IInputHookRes {
    name: string;
    value: string;
    error: boolean;
    errorText: string;
    setValue: (data: string) => void;
    setVisited: (data: boolean) => void;
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
    name: string;
    errorText: string;
    error: boolean;
    setValue: (data: string) => void;
    setVisited: (data: boolean) => void;
}
