"use client";
import { useState } from "react";
import ListNameInput from "../inputbox/ListNameInput";
import CalendarPicker from "../dateTimePicker/CalendarPicker ";
import ListSelect from "../ListSelect";
import { listStatusOptions } from "@/consts/OptionList";
// import { useListContext } from '@/contexts/ListContext';

const DirectoryFilterDropdown = () => {
  const [listName, setListName] = useState("");
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("未完了");

  // const { lists, setLists, sortLists, setSortLists } = useListContext();

  // 入力値変更ハンドラ
  const onListNameChange = (listName: string) => {
    setListName(listName);
    console.log("変更されたリスト名:", listName);
  };

  const handleSelectChange = (value: string) => {
    setSelectedStatus(value);
  };

  return (
    <div className="bg-gradient-to-b from-[rgba(255,224,178,0.98)] to-[rgba(255,183,77,0.98)] border-4 border-[#FF9800] rounded-lg p-6 shadow-md min-h-[30vh] max-h-[70vh] flex flex-col items-center mx-auto">
      <div className="m-auto">
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-center w-fit">
            <div className="w-full max-w-[400px] self-start">
              <ListNameInput
                listName={listName}
                onChange={onListNameChange}
                error={error}
                setError={setError}
                className="text-lg w-full"
              />
            </div>
          </div>

          <div className="flex justify-center w-fit">
            <div className="w-full max-w-[400px] flex flex-col sm:flex-row gap-2 justify-center self-start">
              <CalendarPicker
                title="登録日"
                className="w-full max-w-[180px] text-center"
              />
              <span className="my-auto">~</span>
              <CalendarPicker className="w-full max-w-[180px] text-center" />
            </div>
          </div>

          <div className="flex justify-center w-fit">
            <div className="w-full max-w-[400px] flex flex-col sm:flex-row gap-2 justify-center self-start">
              <CalendarPicker
                title="更新日"
                className="w-full max-w-[180px] text-center"
              />
              <span className="my-auto">~</span>
              <CalendarPicker className="w-full max-w-[180px] text-center" />
            </div>
          </div>

          <div className="flex justify-center w-fit">
            <div className="w-full max-w-[400px] self-start">
              <ListSelect
                title="進捗状況"
                options={listStatusOptions}
                onSelect={handleSelectChange}
                className="w-full w-[75px] h-[40px] max-w-[75px]"
              />
              <p>選択された進捗状況: {selectedStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectoryFilterDropdown;
