'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import ListNameInput from "@components/inputbox/ListNameInput";
import ListSelect from '@/components/ListSelect';
import { listTypeOptions } from '@/consts/OptionList';

type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const ListCreate = () => {
  const params = useParams();
  const { userid } = params;

  const userId = Number(userid);

  if (isNaN(userId)) {
    return <p>ユーザーIDが無効です。</p>;
  }

  const users: Record<number, User> = {
    1: { id: 1, name: 'kanon', age: 30, email: 'kanon@example.com' },
    2: { id: 2, name: 'katayanagi', age: 25, email: 'katayanagi@example.com' },
  };

  if (!(userId in users)) {
    return <p>ユーザーが見つかりません</p>;
  }

  const user = users[userId];

  // 入力値とエラーメッセージの状態
  const [listname, setListname] = useState('');
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState<string>("simple");



   // リスト名変更（文字列を直接受け取る）
   const onListnameChange = (value: string) => {
    setListname(value);
  };
  
    //リスト選択変更
    const handleSelectChange = (value: string) => {
      setSelectedType(value);
    };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listname || error) {
      setError('リスト名を入力してください');
      return;
    }

    // フォーム送信のロジック（仮）
    console.log('送信するデータ:', { listname, userId });
    // サーバーに送信する処理を書く
  };


  return (
    <div>
      <h1>リスト新規作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>リスト名</h2>
          <ListNameInput
            listname={listname}
            onChange={onListnameChange}
            error={error}
            setError={setError}
            width="300px"
            height="50px"
          />
           <h2>リストタイプ</h2>
           <ListSelect options={listTypeOptions} onSelect={handleSelectChange} />
           <h2>投票開始日設定</h2>
           <h2>時間</h2>
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default ListCreate;
