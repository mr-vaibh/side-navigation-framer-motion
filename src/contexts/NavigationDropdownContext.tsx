// DropdownContext.tsx

import React, { createContext, useContext, useState } from "react";

// Define Context
interface DropdownContextType {
    openDropdown: string | null;
    setOpenDropdown: (name: string | null) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

// Define Provider
export const DropdownProvider = ({ children }: { children: React.ReactNode }) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const contextValue: DropdownContextType = {
        openDropdown,
        setOpenDropdown,
    };

    return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>;
};

// Custom Hook to use Context
export const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a DropdownProvider");
    }
    return context;
};
