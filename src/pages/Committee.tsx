import React, { useEffect, useState } from 'react';
import { utilsActions } from '../redux/actions/utilsActions';

export default function CommitteePage() {
    const [count, setCount] = useState(1);
    const test = () => {
        utilsActions.addMessage({ status: count % 2 === 0 ? 'error' : 'success', message: `${count}` });
        // utilsActions.addMessage({ status: 'info', message: `${2}` });
        // utilsActions.addMessage({ status: 'success', message: `${3}` });
        // utilsActions.addMessage({ status: 'warn', message: `${4}` });

        setCount((prev) => prev + 1);
    };

    return (
        <>
            <button onClick={test} className="p-3 bg-slate-500 rounded-lg m-4">
                Add message
            </button>
        </>
    );
}
