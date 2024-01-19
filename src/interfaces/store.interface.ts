export interface IStore {
    user: IUserStore;
    utils: IUtilsStore;
}

export interface IUserStore {
    name: string | null;
}

export interface IUtilsStore {
    windowSize: IUtilsStoreWindowSize | null;
    isLoading: boolean;
    message: IUtilsStoreMessage[];
}

interface IUtilsStoreWindowSize {
    width: number;
    height: number;
}

interface IUtilsStoreMessage {
    code: number;
    message: string;
}
