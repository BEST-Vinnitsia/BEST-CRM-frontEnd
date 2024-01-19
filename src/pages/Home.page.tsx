import React from 'react';
import { useSelector } from '../redux/store';
import { IStore } from '../interfaces/store.interface';
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
            <button onClick={handler}>loading</button>
        </>
    );
}
