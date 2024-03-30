"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GameIdType {
  value: number;
  setValue: (value: number) => void;
}

const GameIdContext = createContext<GameIdType | undefined>(undefined);

export const GameIdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<any>(null);

  return (
    <GameIdContext.Provider value={{ value, setValue }}>
      {children}
    </GameIdContext.Provider>
  );
};

export const useGameIdContext = (): GameIdType => {
  const context = useContext(GameIdContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
