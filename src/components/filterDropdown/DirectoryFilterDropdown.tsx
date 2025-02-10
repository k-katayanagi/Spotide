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
    <div>
      <ListNameInput
        placeholder="検索するリスト名を入力してください"
        listname={listname}
        onChange={onListnameChange}
        error={error}
        setError={setError}
        width="300px"
        height="50px"
      />
    </div>
  );
};

export default DirectoryFilterDropdown;
