import React, { useEffect, useCallback } from 'react';
import { useSelector } from '../redux/store';
import { IStore, IUserStoreToken } from '../interfaces/store';
import { session } from './session';

interface IProps {
    children: React.ReactNode;
}

export default function AuthContainer({ children }: IProps) {
    const userTokens = useSelector((state: IStore) => state.user.token);

    const initialize = useCallback((tokens: IUserStoreToken) => {
        session.restoreSession(tokens);
    }, []);

    useEffect(() => {
        initialize(userTokens);
    }, [initialize]);

    return <>{children}</>;
}
