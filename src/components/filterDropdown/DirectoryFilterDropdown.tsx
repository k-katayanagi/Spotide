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
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md w-full max-w-[1024px] min-h-[30vh] max-h-[70vh] flex flex-col items-center mx-auto">
      <div className="w-full flex flex-col gap-4">
        {/* リスト名入力 */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[400px] flex flex-col items-start">
            <ListNameInput
              placeholder="検索するリスト名を入力してください"
              listname={listname}
              onChange={onListnameChange}
              error={error}
              setError={setError}
              className="text-lg w-full"
            />
          </div>
        </div>

        {/* 登録日 */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[400px] flex flex-col sm:flex-row items-start gap-2 justify-center">
            <CalendarPicker title="登録日" className="w-full max-w-[180px] text-center" />
            <span className="my-auto">~</span>
            <CalendarPicker className="w-full max-w-[180px] text-center" />
          </div>
        </div>

        {/* 更新日 */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[400px] flex flex-col sm:flex-row items-start gap-2 justify-center">
            <CalendarPicker title="更新日" className="w-full max-w-[180px] text-center" />
            <span className="my-auto">~</span>
            <CalendarPicker className="w-full max-w-[180px] text-center" />
          </div>
        </div>

        {/* 進捗状況 */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[400px] flex flex-col sm:flex-row items-start gap-2 justify-center">
            <ListSelect
              title="進捗状況"
              options={listStatusOptions}
              onSelect={handleSelectChange}
              className="w-full w-[75px] h-[40px] max-w-[250px]"
            />
          </div>
        </div>
      </div>
    </div>
   );
};
export default DirectoryFilterDropdown;