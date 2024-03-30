import React, { createContext, useState, useContext, useEffect } from 'react';

interface AppContextProps {
  toggleRevenueSidebar: () => void;
  getRevenueSidebarOpen: () => boolean;
  setRevenueSidebarOpen: (value: boolean) => void;
  children: React.ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [revenueSidebarOpen, setRevenueSidebarOpen] = useState(false);

  const toggleRevenueSidebar = () => {
    setRevenueSidebarOpen(prevState => !prevState);
  };

  const getRevenueSidebarOpen = () => { return revenueSidebarOpen }

  const value = {
    getRevenueSidebarOpen,
    toggleRevenueSidebar,
    setRevenueSidebarOpen,
    children
  };


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );

};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a UserProvider');
  }
  return context;
};