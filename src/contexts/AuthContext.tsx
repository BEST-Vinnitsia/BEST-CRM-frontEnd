import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { useSelector } from '../redux/store';
import { IStore, IUserStoreToken } from '../interfaces/redux/store';

interface IProps {
    test: string;
}

interface IAuthProviderProps {
    children: React.ReactNode;
}

//
//
//

const AuthContext = createContext<IProps>(null!);

export const AuthProvider = (props: IAuthProviderProps) => {
    const userTokens = useSelector((state: IStore) => state.user.token);

    const initialize = useCallback((tokens: IUserStoreToken) => {
        // session.restoreSession(tokens);
        console.warn('AUTH IS DISABLE');
    }, []);

    useEffect(() => {
        initialize(userTokens);
    }, [initialize]);

    return (
        <AuthContext.Provider
            value={{
                test: 'asd', //
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
