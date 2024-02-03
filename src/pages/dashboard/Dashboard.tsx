import React from 'react';
import { useSelector } from '../../redux/store';
import { IStore } from '../../interfaces/redux/store';
import { utilsActions } from '../../redux/actions/utilsActions';
import { userActions } from '../../redux/actions/userActions';

export default function DashboardPage() {
    // const isLoading = useSelector((state: IStore) => state.utils.isLoading);

    const handler = () => {
        utilsActions.loading(true);
        setTimeout(() => {
            utilsActions.loading(false);
        }, 2000);
    };

    return (
        <>
            <button onClick={handler} className="p-2 m-4 bg-cyan-800 rounded-lg">
                loading
            </button>
            <button
                onClick={() => userActions.setAccessToken(new Date().toISOString())}
                className="p-2 m-4 bg-cyan-800 rounded-lg"
            >
                access
            </button>

            <button
                onClick={() => userActions.setRefreshToken(new Date().toISOString())}
                className="p-2 m-4 bg-cyan-800 rounded-lg"
            >
                refresh
            </button>

            <button onClick={() => userActions.logout()} className="p-2 m-4 bg-cyan-800 rounded-lg">
                delete
            </button>
        </>
    );
}
