"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

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
    1: { id: 1, name: "kanon", age: 30, email: "kanon@example.com" },
    2: { id: 2, name: "katayanagi", age: 25, email: "katayanagi@example.com" },
  };

  // ユーザーが見つからない場合
  if (!(userId in users)) {
    return <p>ユーザーが見つかりません</p>;
  }

  const user = users[userId];

  return (
    <div>
      <h1>{user.name}さんのマイページ</h1>
      <div className="grid grid-cols-2 gap-x-[300px] gap-y-[100px] max-w-xs mx-auto justify-items-start">
        {/* TOPカード */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-[100px] md:w-[200px]">
          <h2 className="text-lg font-bold">TOP</h2>
          <Image
            src="/images/top.svg"
            alt="TOPアイコン"
            width={80}
            height={80}
            priority
          />
        </div>

        {/* リスト作成カード */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-[100px] md:w-[200px]">
          <h2 className="text-lg font-bold">リスト作成</h2>
          <Image
            src="/images/createList.svg"
            alt="リスト作成アイコン"
            width={80}
            height={80}
            priority
          />
        </div>

        {/* ユーザー名変更カード */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-[100px] md:w-[200px]">
          <h2 className="text-lg font-bold">ユーザー名変更</h2>
          <Image
            src="/images/userNameChange.svg"
            alt="ユーザー名変更アイコン"
            width={80}
            height={80}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Mypage;
