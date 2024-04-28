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
      // Close all dropdowns initially
      const newState = Object.keys(prevState).reduce((state, key) => {
        state[key] = false; // Set all to false (closed)
        return state;
      }, {} as { [key: string]: boolean });

      // Toggle the state of the clicked dropdown
      newState[id] = !isCurrentlyOpen;

      return newState;
    });
  };

  const isNavSidebarOpen = (id: string): boolean => {
    return !!navSidebars[id];
  };

  const setNavSidebarOpen = (id: string, value: boolean) => {
    // This can remain unchanged, but you may choose to enforce single dropdown logic here as well.
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


// FIRST USE CONTEXT TO HANDLE 1 DROPDOWN

// import React, { createContext, useState, useContext, useEffect } from 'react';

// interface AppContextProps {
//   toggleNavSidebar: () => void;
//   getNavSidebarOpen: () => boolean;
//   setNavSidebarOpen: (value: boolean) => void;
//   children: React.ReactNode;
// }

// const AppContext = createContext<AppContextProps | undefined>(undefined);

// export const AppProvider = ({ children }: { children: React.ReactNode }) => {
//   const [navSidebarOpen, setNavSidebarOpen] = useState(false);

//   const toggleNavSidebar = () => {
//     setNavSidebarOpen(prevState => !prevState);
//   };

//   const getNavSidebarOpen = () => { return navSidebarOpen }

//   const value = {
//     getNavSidebarOpen,
//     toggleNavSidebar,
//     setNavSidebarOpen,
//     children
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error('useAppContext must be used within a UserProvider');
//   }
//   return context;
// };





