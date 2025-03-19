'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { testList } from '@/app/user/[userid]/individual_list/testlistdata';
import { List } from '@/types/ListTypes';

type ListContextType = {
  lists: List[];
  setLists: (lists: List[]) => void;
  sortLists: List[];
  setSortLists: (sortLists: List[]) => void;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<List[]>(testList);
  const [sortLists, setSortLists] = useState<List[]>([]);

  return (
    <ListContext.Provider value={{ lists, setLists, sortLists, setSortLists }}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useListContext must be used within a ListProvider');
  }
  return context;
};
