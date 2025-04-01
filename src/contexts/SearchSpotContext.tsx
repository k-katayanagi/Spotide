'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Spot } from '@/types/ListTypes';

type SearchSpotContextType = {
  searchSpots: any[];
  filteredSpots: any[];
  setSearchSpots: (spots: any[]) => void;  // 型を any[] に変更
  setFilteredSpots: (spots: any[]) => void;
}

const SearchSpotContext = createContext<SearchSpotContextType | undefined>(undefined);

export const SearchSpotProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchSpots, setSearchSpots] = useState<any[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<any[]>([]);

  return (
    <SearchSpotContext.Provider value={{ searchSpots, filteredSpots, setSearchSpots, setFilteredSpots }}>
      {children}
    </SearchSpotContext.Provider>
  );
};

export const useSearchSpotContext = () => {
  const context = useContext(SearchSpotContext);
  if (!context) {
    throw new Error("useSearchSpotContext must be used within a SearchSpotProvider");
  }
  return context;
};
