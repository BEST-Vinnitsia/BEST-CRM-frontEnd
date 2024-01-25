import React from 'react';
import { useSelector } from '../redux/store';
import { IStore } from '../interfaces/store';
import { Navigate } from 'react-router-dom';
import { PATH_HOME } from '../routes/paths';

interface IProps {
    children: React.ReactNode;
}

export default function GuestGuard({ children }: IProps) {
    const accessToken = useSelector((state: IStore) => state.user.token.access);

    // if (accessToken) return <Navigate to={PATH_HOME.ROOT} />;

    return <>{children}</>;
}
