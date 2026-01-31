import React, { createContext, useContext, useState, type ReactNode } from 'react';

type AppMode = 'standard' | 'simplified';

interface AppModeContextType {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
    isSimplified: boolean;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export function AppModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<AppMode>('standard');

    return (
        <AppModeContext.Provider value={{
            mode,
            setMode,
            isSimplified: mode === 'simplified'
        }}>
            {children}
        </AppModeContext.Provider>
    );
}

export function useAppMode() {
    const context = useContext(AppModeContext);
    if (!context) {
        throw new Error('useAppMode must be used within an AppModeProvider');
    }
    return context;
}
