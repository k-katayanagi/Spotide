'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { List } from '@/types/ListTypes';

const ListContext = createContext<
  | {
      lists: List[];
      setLists: (list: List[]) => void;
      sortLists: List[];
      setSortLists: (sortLists: List[]) => void;
    }
  | undefined
>(undefined);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [sortLists, setSortLists] = useState<List[]>([]);

  return (
    <ListContext.Provider value={{ lists, setLists, sortLists, setSortLists }}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context)
    throw new Error('useListContext must be used within a ListProvider');
  return context;
};
