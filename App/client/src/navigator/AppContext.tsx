import React, {createContext, useState} from 'react';

interface AppContextType {
  skippedAuth: boolean;
  setSkippedAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({
  skippedAuth: false,
  setSkippedAuth: () => {},
});

export const AppContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [skippedAuth, setSkippedAuth] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{skippedAuth, setSkippedAuth}}>
      {children}
    </AppContext.Provider>
  );
};
