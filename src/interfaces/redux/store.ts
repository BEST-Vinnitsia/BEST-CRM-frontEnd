export interface IStore {
    user: IUserStore;
    utils: IUtilsStore;
}

//
//
//

export interface IUserStore {
    name: string | null;
    token: IUserStoreToken;
    claims: string[];
}

export interface IUtilsStore {
    isLoading: boolean;
    isLoadingApp: boolean;
    windowSize: IUtilsStoreWindowSize | null;
    message: IUtilsStoreMessage[];
    smallSidebar: boolean;
}

//
//
//

/* ----------------  user  ---------------- */

export interface IUserStoreToken {
    access: string | null;
    refresh: string | null;
}

/* ----------------  utils  ---------------- */

interface IUtilsStoreWindowSize {
    width: number;
    height: number;
}

export interface IUtilsStoreMessage {
    id: string;
    status: 'info' | 'success' | 'warn' | 'error';
    message: string;
}
