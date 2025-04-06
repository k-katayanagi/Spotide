'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Spot } from '@/types/ListTypes';
import { testListItem } from '@/app/user/[userid]/individual_list/testlistdata';

type SearchSpotContextType = {
  searchSpots: Spot[];
  setSearchSpots: (spots: Spot[]) => void;
  filteredSpots: Spot[];
  setFilteredSpots: (spots: Spot[]) => void;
};

const SearchSpotContext = createContext<SearchSpotContextType | undefined>(undefined);

export const SearchSpotProvider = ({ children }: { children: ReactNode }) => {
  const [searchSpots, setSearchSpots] = useState<Spot[]>(testListItem);
  const [filteredSpots, setFilteredSpots] = useState<Spot[]>([]);

  return (
    <SearchSpotContext.Provider value={{ searchSpots, setSearchSpots, filteredSpots, setFilteredSpots }}>
      {children}
    </SearchSpotContext.Provider>
  );
};

export const useSearchSpotContext = () => {
  const context = useContext(SearchSpotContext);
  if (!context) {
    throw new Error('useSearchSpotContext must be used within a SearchSpotProvider');
  }
  return context;
};
