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
    <div className="overflow-auto relative">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">{user.name}さんのマイページ</h1>
      </div>

      <div className="h-[70vh]">
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-1 gap-5 md:gap-3 justify-items-center">
          {/* TOPカード */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-60 h-40 md:w-96">
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg font-bold">TOP</h2>
              <Image
                src="/images/top.svg"
                alt="TOPアイコン"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>

          {/* リスト作成カード */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-60 h-40 md:w-96">
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg font-bold">リスト作成</h2>
              <Image
                src="/images/createList.svg"
                alt="リスト作成アイコン"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>

          {/* ユーザー名変更カード */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-60 h-40 md:w-96">
            <div className="w-full flex flex-col items-center">
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

          {/* 個人リスト */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-60 h-40 md:w-96">
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg font-bold">個人リスト</h2>
              <Image
                src="/images/individualList.svg"
                alt="個人リスト"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>

          {/* 共有リスト */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-60 h-40 md:w-96">
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg font-bold">共有リスト</h2>
              <Image
                src="/images/shareList.svg"
                alt="共有リスト"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>

          {/* ログアウト */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-60 h-40 md:w-96">
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg font-bold">ログアウト</h2>
              <Image
                src="/images/logout.svg"
                alt="ログアウト"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>

          {/* 退会 */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-60 h-40 md:w-96">
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg font-bold">退会</h2>
              <Image
                src="/images/withdrawal.svg"
                alt="退会"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
