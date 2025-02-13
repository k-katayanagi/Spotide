'use client';
import { useState } from 'react';
import ListNameInput from '../inputbox/ListNameInput';
import CalendarPicker from '../dateTimePicker/CalendarPicker ';
import ListSelect from '../ListSelect';
import { listStatusOptions } from '@/consts/OptionList';
// import { useListContext } from '@/contexts/ListContext';

const DirectoryFilterDropdown = () => {
  const [listname, setListname] = useState('');
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState<string>("simple");
  
  // const { lists, setLists, sortLists, setSortLists } = useListContext();

  // 入力値変更ハンドラ
  const onListnameChange = (value: string) => {
    setListname(value);
  };


  const handleSelectChange = (value: string) => {
    setSelectedType(value);
    console.log(value);
  };


  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md w-full max-w-[1024px] min-h-[30vh] max-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-[900px] flex flex-col items-center justify-center">
        <div className="w-full max-w-[400px] flex flex-col gap-2">
          <span className="text-xl font-semibold text-left sm:mr-2 sm:w-auto w-full">リスト名</span>
          <ListNameInput
            placeholder="検索するリスト名を入力してください"
            listname={listname}
            onChange={onListnameChange}
            error={error}
            setError={setError}
            className="text-lg sm:w-80 w-full mt-2 sm:mt-0"
          />

          <span className="text-xl font-semibold text-left sm:mr-2 sm:w-auto w-full">登録日</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <CalendarPicker />
            <span className="my-auto">~</span>
            <CalendarPicker />
          </div>

          <span className="text-xl font-semibold text-left sm:mr-2 sm:w-auto w-full">更新日</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <CalendarPicker />
            <span className="my-auto">~</span>
            <CalendarPicker />
          </div>

          <ListSelect
            options={listStatusOptions}
            onSelect={handleSelectChange}
            style={{ width: "300px", height: "50px" }}
          />
        </div>
      </div>
    </div>
   );
};
export default DirectoryFilterDropdown;
