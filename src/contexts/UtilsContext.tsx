import React, { createContext, useContext } from 'react';
import { useWindowSize } from '../hooks';

interface IWindowSize {
    width: number;
    height: number;
}

//
//
//

interface IProps {
    windowSize: IWindowSize;
}

interface IUtilsProviderProps {
    children: React.ReactNode;
}

//
//
//

const UtilsContext = createContext<IProps>(null!);

export const UtilsProvider = (props: IUtilsProviderProps) => {
    const windowSize = useWindowSize(100);

    return (
        <UtilsContext.Provider
            value={{
                windowSize, //
            }}
        >
            {props.children}
        </UtilsContext.Provider>
    );
};

export const useUtilsContext = () => useContext(UtilsContext);
