export interface IStore {
    user: IUserStore;
    utils: IUtilsStore;
}

//
//
//

export interface IUserStore {
    name: string | null;
}

export interface IUtilsStore {
    isLoading: boolean;
    isLoadingApp: boolean;
    windowSize: IUtilsStoreWindowSize | null;
    message: IUtilsStoreMessage[];
}

//
//
//

interface IUtilsStoreWindowSize {
    width: number;
    height: number;
}

export interface IUtilsStoreMessage {
    id: string;
    status: 'info' | 'success' | 'warn' | 'error';
    message: string;
}
