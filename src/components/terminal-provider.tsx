'use client';

import React, { createContext, useContext, useState } from 'react';

interface TerminalContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTerminal = () => setIsOpen((prev) => !prev);

  return (
    <TerminalContext.Provider value={{ isOpen, setIsOpen, toggleTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}
