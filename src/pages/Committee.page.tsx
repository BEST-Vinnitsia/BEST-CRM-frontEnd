import React, { useEffect, useState } from 'react';
import { utilsActions } from '../redux/actions/utilsActions';

export default function CommitteePage() {
    const [count, setCount] = useState(0);

    const test = () => {
        const random = Math.trunc(Math.random() * (4 - 0) + 0);

        utilsActions.addMessage({ code: random, message: `${count}` });
        setCount(count + 1);
    };

    return (
        <>
            <button onClick={test} className="p-3 bg-slate-500">
                Add message
            </button>
        </>
    );
}
