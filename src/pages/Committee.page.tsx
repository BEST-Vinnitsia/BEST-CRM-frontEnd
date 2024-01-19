import React from 'react';
import { utilsActions } from '../redux/actions/utilsActions';

export default function CommitteePage() {
    const test = () => {
        utilsActions.addMessage({ status: 1, message: `${Math.random()}` });
    };

    return (
        <>
            <button onClick={test}>Add message</button>
        </>
    );
}
