'use client';

import { useParams } from 'next/navigation';

type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const Mypage = () => {
  const params = useParams();
  const { userid } = params;

  // paramsから返されるのはstring型なので、number型に変換
  const userId = Number(userid);

  if (isNaN(userId)) {
    return <p>ユーザーIDが無効です。</p>;
  }

  // 仮データ
  const users: Record<number, User> = {
    1: { id: 1, name: 'kanon', age: 30, email: 'kanon@example.com' },
    2: { id: 2, name: 'katayanagi', age: 25, email: 'katayanagi@example.com' },
  };

  // ユーザーが見つからない場合
  if (!(userId in users)) {
    return <p>ユーザーが見つかりません</p>;
  }

  const user = users[userId];

  return (
    <div>
      <h1>{user.name}さんのマイページ</h1>
    </div>
  );
};

export default Mypage;
