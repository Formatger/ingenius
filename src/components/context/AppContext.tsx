// USE CONTEXT TO HANDLE MULTIPLE DROPDOWNS

import React, { createContext, useState, useContext } from 'react';

interface AppContextProps {
  toggleNavSidebar: (id: string) => void;
  isNavSidebarOpen: (id: string) => boolean;
  setNavSidebarOpen: (id: string, value: boolean) => void;
  updateUserData: boolean;
  setUpdateUserData: (value: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navSidebars, setNavSidebars] = useState<{ [key: string]: boolean }>({});
  const [updateUserData, setUpdateUserData] = useState(false);

  const toggleNavSidebar = (id: string) => {
    setNavSidebars(prevState => {
      const isCurrentlyOpen = !!prevState[id];
      const newState = Object.keys(prevState).reduce((state, key) => {
        state[key] = false; 
        return state;
      }, {} as { [key: string]: boolean });

      newState[id] = !isCurrentlyOpen;

      return newState;
    });
  };

  const isNavSidebarOpen = (id: string): boolean => {
    return !!navSidebars[id];
  };

  const setNavSidebarOpen = (id: string, value: boolean) => {
    setNavSidebars(prevState => ({ ...prevState, [id]: value }));
  };

  const value = {
    toggleNavSidebar,
    isNavSidebarOpen,
    setNavSidebarOpen,
    updateUserData,
    setUpdateUserData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};