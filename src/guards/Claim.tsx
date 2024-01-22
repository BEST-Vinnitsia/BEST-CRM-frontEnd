import React from 'react';
import { useSelector } from '../redux/store';
import { IStore } from '../interfaces/store';
import { PATH_ERROR } from '../routes/paths';
import { Navigate } from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
    claims: string[];
}

export default function ClaimGuard({ children, claims }: IProps) {
    const userClaims = useSelector((state: IStore) => state.user.claims);
    if (!userClaims) return <Navigate to={PATH_ERROR[403]} />;

    for (const item of claims) {
        if (!userClaims.includes(item)) {
            return <Navigate to={PATH_ERROR[403]} />;
        }
    }

    return <>{children}</>;
}
