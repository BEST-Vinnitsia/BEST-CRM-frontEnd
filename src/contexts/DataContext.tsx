import React, { createContext, useContext, useState } from 'react';

interface ICadenceList {
    id: number;
    number: number;
}

//
//
//

interface IProps {
    cadenceList: ICadenceList[];
    getCadenceList: () => void;
}

interface IDataProviderProps {
    children: React.ReactNode;
}

//
//
//

const DataContext = createContext<IProps>(null!);

export const DataProvider = (props: IDataProviderProps) => {
    const [cadenceList, setCadenceList] = useState<ICadenceList[]>([]);

    const getCadenceList = () => {
        if (cadenceList.length) return;
        setCadenceList([
            { id: 0, number: 1 },
            { id: 1, number: 2 },
        ]);
    };

    return (
        <DataContext.Provider
            value={{
                cadenceList,
                getCadenceList, //
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
