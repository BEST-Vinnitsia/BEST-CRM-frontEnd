import React from 'react';
import { useSelector } from '../redux/store';
import { IStore } from '../interfaces/store';
import { utilsActions } from '../redux/actions/utilsActions';

export default function HomePage() {
    // const isLoading = useSelector((state: IStore) => state.utils.isLoading);

    const handler = () => {
        utilsActions.loading(true);
        setTimeout(() => {
            utilsActions.loading(false);
        }, 2000);
    };

    return (
        <>
            <button onClick={handler} className='p-2 m-4 bg-cyan-800 rounded-lg'>loading</button>
        </>
    );
}
