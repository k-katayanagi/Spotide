'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import ListNameInput from '@components/inputbox/ListNameInput';
import ListSelect from '@/components/ListSelect';
import { listTypeOptions } from '@/consts/OptionList';
import DateTimePicker from '@/components/dateTimePicker/DateTimePicker';
import OutingCalendarPicker from '@/components/dateTimePicker/OutingCalendarPicker';
import SubmitButton from '@/components/buttons/SubmitButton';
import { useToast } from '@chakra-ui/react';

const ListCreate = () => {
  const { data: session } = useSession();
  const toast = useToast();
  const [error, setError] = useState('');
  const [listName, setListName] = useState('');
  const [selectedType, setSelectedType] = useState<string>('individual');
  const [voteDate, setVoteDate] = useState<Date | null>(null);
  const [outingDate, setOutingDate] = useState<Date | null>(null);

  // 入力値変更ハンドラ
  const onListNameChange = (value: string) => {
    setListName(value);
  };

  const handleSelectChange = (value: string) => {
    setSelectedType(value);
    console.log(value);
  };

  const handleVoteDateChange = (date: Date | null) => {
    setVoteDate(date);
  };

  const handleOutingDateChange = (date: Date | null) => {
    setOutingDate(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 入力検証
    if (!listName || error) {
      setError('リスト名を入力してください');
      return;
    }

    // API 呼び出し
    const response = await fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listName,
        selectedType,
        voteDate,
        outingDate,
        userId: session?.user.id,
        username: session?.user.name,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // 成功時のトースト表示
      toast({
        title: 'リスト作成しました',
        status: 'success',
        duration: 5000, // 表示時間（ミリ秒）
        isClosable: true, // 閉じるボタン
        position: 'top',
      });

      // 成功時にフォームのリセット
      setListName('');
      setSelectedType('individual');
      setVoteDate(null);
      setOutingDate(null);
      setError('');
    } else {
      // エラー時のトースト表示
      toast({
        title: 'リスト作成エラー',
        description: data.error || 'データ送信に失敗しました',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-5 pl-5">
      <h1 className="text-xl font-bold mt-0">リスト新規作成</h1>
      <div className="flex flex-col items-center justify-start w-full flex-grow mt-20">
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col items-center space-y-10 w-full max-w-[400px]"
        >
          <div className="w-full flex flex-col self-start">
            <ListNameInput
              listName={listName}
              onChange={onListNameChange}
              error={error}
              setError={setError}
              className="w-full h-[40px]"
            />
          </div>

          <div className="flex flex-col items-start self-start">
            <ListSelect
              options={listTypeOptions}
              onSelect={handleSelectChange}
              title="リストタイプ"
            />
          </div>

          <div className="w-full flex flex-col self-start">
            <DateTimePicker
              title="投票開始日時設定"
              onDateChange={handleVoteDateChange}
              value={voteDate}
            />
          </div>

          <div className="w-full flex flex-col self-start">
            <OutingCalendarPicker
              title="お出かけ日"
              onChange={handleOutingDateChange}
              value={outingDate}
            />
          </div>

          {/* 🔹 SubmitButton だけ右端に配置 */}
          <div className="w-full flex justify-end mt-5">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListCreate;
