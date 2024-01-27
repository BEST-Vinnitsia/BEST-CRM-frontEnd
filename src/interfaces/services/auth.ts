export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginRes {
    access: string;
    refresh: string;
}

export interface IRefresh {
    access: string;
}
