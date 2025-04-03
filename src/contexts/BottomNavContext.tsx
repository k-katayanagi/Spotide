'use client';

import { createContext, useContext, useState } from 'react';

type BottomNavContextType = {
  isBottomNavOpen: boolean;
  setIsBottomNavOpen: (isOpen: boolean) => void;
};

// Contextを作成
const BottomNavContext = createContext<BottomNavContextType | undefined>(
  undefined,
);

// Providerを作成
export const BottomNavProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isBottomNavOpen, setIsBottomNavOpen] = useState(false);

  return (
    <BottomNavContext.Provider value={{ isBottomNavOpen, setIsBottomNavOpen }}>
      {children}
    </BottomNavContext.Provider>
  );
};

// Contextを使いやすくするためのHook
export const useBottomNav = () => {
  const context = useContext(BottomNavContext);
  if (!context) {
    throw new Error('useBottomNav must be used within a BottomNavProvider');
  }
  return context;
};
