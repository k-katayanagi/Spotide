"use client";
import { useState } from "react";
import ListSelect from "../ListSelect";
import { listInfo, Sort } from "@/consts/OptionList";
import OkButton from "../buttons/OkButton";
// import { useListContext } from '@/contexts/ListContext';

const DirectorySortDropdown = () => {
  const [selectedListInfo, setSelectedListInfo] = useState<string>("作成日時");
  const [selectedSort, setSelectedSort] = useState<string>("昇順");

  // const { lists, setLists, sortLists, setSortLists } = useListContext();

  const handleListInfoChange = (value: string) => {
    setSelectedListInfo(value);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  return (
    <div
      className="bg-gradient-to-b from-[rgba(255,224,178,0.98)] to-[rgba(255,183,77,0.98)] border-4 border-[#FF9800] rounded-lg p-6 shadow-md 
                min-h-[50vh] max-h-[80vh] lg:min-h-[30vh] lg:max-h-[70vh] 
                flex flex-col items-center mx-auto"
    >
      <div className="m-auto">
        <div className="flex gap-7 justify-center items-center h-full w-full">
          {/* リスト情報 */}
          <ListSelect
            options={listInfo}
            onSelect={handleListInfoChange}
            className="w-[150px]  h-[40px] max-w-[400px] text-center"
          />
          <p>{selectedListInfo}</p>

          {/* 並び替え */}
          <ListSelect
            options={Sort}
            onSelect={handleSortChange}
            className="w-full h-[40px] max-w-[100px] text-center "
          />
          <p>{selectedSort}</p>
        </div>
        <div className="flex justify-end w-full">
          <OkButton />
        </div>
      </div>
    </div>
  );
};

export default DirectorySortDropdown;
