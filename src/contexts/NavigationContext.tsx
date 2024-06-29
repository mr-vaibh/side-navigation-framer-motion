import { createContext, useContext, ReactNode, useState } from 'react';

interface NavigationContextType {
  isOpen: boolean;
  toggleOpen: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isOpen: false,
  toggleOpen: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

interface NavigationProviderProps {
  children: ReactNode;
  value: NavigationContextType;
}

export const NavigationProvider = ({ children, value }: NavigationProviderProps) => {
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
