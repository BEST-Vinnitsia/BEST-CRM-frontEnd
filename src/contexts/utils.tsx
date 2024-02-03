import React, { createContext, useContext, useState } from 'react';
import { useWindowSize } from '../hooks';

interface IUtilsProvider {
    children: React.ReactNode;
}

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

export const UtilsProvider = ({ children }: IUtilsProvider) => {
    const windowSize = useWindowSize(300);

    const provideData: IProvideData = {
        windowSize,
    };

    return <UtilsContext.Provider value={provideData}>{children}</UtilsContext.Provider>;
};
