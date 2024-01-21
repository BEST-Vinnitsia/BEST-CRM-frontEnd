import React, { useEffect, useState } from 'react';
import { utilsActions } from '../redux/actions/utilsActions';

export default function CommitteePage() {
    const test = () => {
        utilsActions.addMessage({ status: 'error', message: `${1}` });
        utilsActions.addMessage({ status: 'info', message: `${2}` });
        utilsActions.addMessage({ status: 'success', message: `${3}` });
        utilsActions.addMessage({ status: 'warn', message: `${4}` });
    };

    return (
        <>
            <button onClick={test} className="p-3 bg-slate-500">
                Add message
            </button>
        </>
    );
}
