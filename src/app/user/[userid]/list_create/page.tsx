'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import ListNameInput from "@components/inputbox/ListNameInput";
import ListSelect from '@/components/ListSelect';
import { listTypeOptions } from '@/consts/OptionList';
import DateTimePicker from '@/components/dateTimePicker/DateTimePicker';
import SubmitButton from '@/components/buttons/SubmitButton';

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
      console.log(value)
    };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listname || error) {
      setError('リスト名を入力してください');
      return;
    }

    // フォーム送信のロジック（仮）
    console.log('送信するデータ:', { userId,listname,selectedType});
    // サーバーに送信する処理を書く
  };


  return (
    <div className="flex flex-col w-full min-h-screen pt-5 pl-5">
      <h1 className="text-xl font-bold mt-0">リスト新規作成</h1>
      <div className="flex flex-col items-center justify-start w-full flex-grow mt-20">
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-center space-y-5">
          {/* リスト名入力 */}
          <div className="space-y-5">
            <h2 className="text-lg font-medium">リスト名</h2>
            <ListNameInput
              listname={listname}
              onChange={onListnameChange}
              error={error}
              setError={setError}
              width="300px"
              height="50px"
            />
          </div>

          <div className="space-y-5">
            <h2 className="text-lg font-medium">リストタイプ</h2>
            <ListSelect 
              options={listTypeOptions} 
              onSelect={handleSelectChange} 
              style={{ width: "300px", height: "50px" }}
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-lg font-medium">投票開始日時設定</h2>
            <DateTimePicker />
          </div>
          <div className="flex justify-center mt-5">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListCreate;
