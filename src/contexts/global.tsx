import React, { createContext, useContext, useState } from 'react';

interface IGlobalProvider {
  children: React.ReactNode;
}

interface IProvideData {
  demo: string;
  setDemo: (str: string) => void;
}

//
//
//

const GlobalContext = createContext<IProvideData | null>(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: IGlobalProvider) => {
  const [demo, setDemo] = useState<string>('');

  const provideData: IProvideData = {
    demo,
    setDemo,
  };

  return <GlobalContext.Provider value={provideData}>{children}</GlobalContext.Provider>;
};
