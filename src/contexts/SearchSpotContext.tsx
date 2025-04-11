'use client';
import { createContext, useContext, useState } from 'react';
import { Spot } from '@/types/ListTypes';

type SearchSpotContextType = {
  searchSpots: Spot[];
  filteredSpots: Spot[];
  setSearchSpots: (spots: Spot[]) => void;
  setFilteredSpots: (spots: Spot[]) => void;
};

const SearchSpotContext = createContext<SearchSpotContextType | undefined>(
  undefined,
);

export const SearchSpotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchSpots, setSearchSpots] = useState<Spot[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<Spot[]>([]);

  return (
    <SearchSpotContext.Provider
      value={{ searchSpots, filteredSpots, setSearchSpots, setFilteredSpots }}
    >
      {children}
    </SearchSpotContext.Provider>
  );
};

export const useSearchSpotContext = () => {
  const context = useContext(SearchSpotContext);
  if (!context) {
    throw new Error(
      'useSearchSpotContext must be used within a SearchSpotProvider',
    );
  }
  return context;
};
