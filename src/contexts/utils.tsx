import React, { createContext, useContext } from 'react';
import { useWindowSize } from '../hooks';

interface IProvideData {
    windowSize: {
        width: number;
        height: number;
    };
}

//
//
//

const UtilsContext = createContext<IProvideData | null>(null);

export const useUtilsContext = () => useContext(UtilsContext);

export const UtilsProvider = ({ children }: { children: React.ReactNode }) => {
    const windowSize = useWindowSize(100);

    const provideData: IProvideData = {
        windowSize,
    };

    return <UtilsContext.Provider value={provideData}>{children}</UtilsContext.Provider>;
};
