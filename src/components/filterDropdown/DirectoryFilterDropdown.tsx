'use client';
import { useState } from 'react';
import ListNameInput from '../inputbox/ListNameInput';
import { useListContext } from '@/contexts/ListContext';

const DirectoryFilterDropdown = () => {
  const [listname, setListname] = useState('');
  const [error, setError] = useState('');
  const { lists, setLists, sortLists, setSortLists } = useListContext();

  // 入力値変更ハンドラ
  const onListnameChange = (value: string) => {
    setListname(value);
  };

  return (
  <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md
                w-full max-w-[1024px] min-h-[30vh] max-h-[70vh] flex flex-col items-center justify-center">
    <div className="w-full max-w-[900px] flex flex-col items-center justify-center">
      <div className="w-full max-w-[400px] flex flex-col gap-2 sm:flex-row sm:items-center">
        <span className="text-xl font-semibold text-left sm:mr-2 sm:w-auto w-full">リスト名</span>
        <ListNameInput
          placeholder="検索するリスト名を入力してください"
          listname={listname}
          onChange={onListnameChange}
          error={error}
          setError={setError}
          className="text-lg sm:w-80 w-full mt-2 sm:mt-0"
        />
      </div>
    </div>
  </div>
   );
};
export default DirectoryFilterDropdown;
