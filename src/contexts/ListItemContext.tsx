'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { testListItem } from '@/app/user/[userid]/individual_list/testlistdata';
import { ListItem } from '@/types/ListTypes';
type ListItemContextType = {
  listItems: ListItem[];
  setListItems: (items: ListItem[]) => void;
};

const ListItemContext = createContext<ListItemContextType | undefined>(undefined);

export const ListItemProvider = ({ children }: { children: ReactNode }) => {
  const [listItems, setListItems] = useState<ListItem[]>(testListItem);

  return (
    <ListItemContext.Provider value={{ listItems, setListItems }}>
      {children}
    </ListItemContext.Provider>
  );
};

export const useListItemContext = () => {
  const context = useContext(ListItemContext);
  if (!context) {
    throw new Error('useListItemContext must be used within a ListItemProvider');
  }
  return context;
};
