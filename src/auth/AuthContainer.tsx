import React, { useEffect, useCallback } from 'react';
import { useSelector } from '../redux/store';
import { IStore, IUserStoreToken } from '../interfaces/redux/store';
import { session } from './session';

interface IProps {
    children: React.ReactNode;
}

export default function AuthContainer({ children }: IProps) {
    const userTokens = useSelector((state: IStore) => state.user.token);

    const initialize = useCallback((tokens: IUserStoreToken) => {
        // session.restoreSession(tokens);
        console.warn('AUTH IS DISABLE. To enable go src > auth > AuthContainer.tsx and uncomment 14th line');
        
    }, []);

    useEffect(() => {
        initialize(userTokens);
    }, [initialize]);

    return <>{children}</>;
}
