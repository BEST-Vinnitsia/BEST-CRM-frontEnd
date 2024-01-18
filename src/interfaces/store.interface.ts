export interface IStore {
    user: IUserStore;
    utils: IUtilsStore;
}

export interface IUserStore {
    name: string | null;
}

export interface IUtilsStore {
    windowSize: {
        width: number;
        height: number;
    } | null;
    isLoading: boolean;
    error: null;
}
