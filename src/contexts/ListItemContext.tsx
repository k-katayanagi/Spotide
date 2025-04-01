"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ListItem } from "@/types/ListTypes";
type ListItemContextType = {
  listItems: ListItem[];
  setListItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
  sortListItems: ListItem[];
  setSortListItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
};

const ListItemContext = createContext<ListItemContextType | undefined>(
  undefined
);

export const ListItemProvider = ({ children }: { children: ReactNode }) => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [sortListItems, setSortListItems] = useState<ListItem[]>([]);

  return (
    <ListItemContext.Provider
      value={{ listItems, setListItems, sortListItems, setSortListItems }}
    >
      {children}
    </ListItemContext.Provider>
  );
};

export const useListItemContext = () => {
  const context = useContext(ListItemContext);
  if (!context) {
    throw new Error(
      "useListItemContext must be used within a ListItemProvider"
    );
  }
  return context;
};
