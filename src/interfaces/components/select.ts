export interface ISelectHookProps {
    placeholder: string;
    hookProps: ISelectMainProps;
    data: {
        id: number | string;
        name: string;
    }[];
}

interface ISelectMainProps {
    value: string;
    errorText: string;
    error: boolean;
    setValue: (data: string) => void;
}

export interface ISelectHookRes {
    name: string;
    required: boolean;
    value: string;
    error: boolean;
    errorText: string;
    setValue: (data: string) => void;
}
