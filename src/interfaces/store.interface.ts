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

interface IUtilsStoreMessage {
    id: string;
    code: number;
    message: string;
}
