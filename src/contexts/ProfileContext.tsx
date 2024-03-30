import React, { createContext, useContext } from 'react';

interface IProps {
    test: string;
}

interface IUtilsProviderProps {
    children: React.ReactNode;
}

//
//
//

const ProfileContext = createContext<IProps>(null!);

export const ProfileProvider = (props: IUtilsProviderProps) => {
    return (
        <ProfileContext.Provider
            value={{
                test: 'asd', //
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = () => useContext(ProfileContext);
