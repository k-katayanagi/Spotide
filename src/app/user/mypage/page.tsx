'use client';

import Image from 'next/image';
import useNavigation from '@/hooks/useNavigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';

const Mypage = () => {
  const { data: session } = useSession();
  const { handleNavigateTo } = useNavigation();
  const [userName, setUserName] = useState<string | null>(null);

  // sessionとuserIdの取得確認
  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await fetch(`/api/users/${session.user.id}`);
        const userData = await userResponse.json();

        if (userResponse.ok) {
          setUserName(userData.user_name); // ユーザー名をステートにセット
        } else {
          console.error('ユーザー名取得エラー:', userData.error);
        }
      } catch (error) {
        console.error('データ取得中にエラーが発生しました:', error);
      }
    };

    fetchData(); // ユーザーIDがあればデータを取得
  }, [session]); // sessionが変更されたときに実行

  // ログアウト処理
  const handleLogout = async () => {
    // 参加認証済みフラグを削除
    localStorage.removeItem('isAuthenticated');
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="overflow-auto relative scrollbar-thin scrollbar-thumb-[#FF5722] scrollbar-track-[#FFE0B2]">
      <div className="flex items-center justify-between mb-[30px]">
        <h1 className="text-2xl font-bold">
          {userName ? `${userName}さんのマイページ` : 'マイページ'}
        </h1>
      </div>

      <div className="h-[70vh] mt-[30px]">
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-1 gap-5 md:gap-x-2 md:gap-y-[100px] justify-items-center lg:scale-90">
          {/* TOPカード */}
          <div
            className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-full max-w-[240px] md:w-96 md:justify-self-end cursor-pointer"
            onClick={() => handleNavigateTo(`/`)}
          >
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
          <div
            className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-full max-w-[240px] md:w-96 cursor-pointer"
            onClick={() =>
              handleNavigateTo(`/user/list_create`)
            }
          >
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
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-full max-w-[240px] md:w-96 md:justify-self-start">
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
          <div
            className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-full max-w-[240px] md:w-96 md:justify-self-end cursor-pointer"
            onClick={() =>
              handleNavigateTo(`/user/individual_list`)
            }
          >
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
          <div
            className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-full max-w-[240px] md:w-96 cursor-pointer"
            onClick={() =>
              handleNavigateTo(`/user/share_list`)
            }
          >
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
          <div
            className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-full max-w-[240px] md:w-96 md:justify-self-start cursor-pointer"
            onClick={handleLogout}
          >
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
          <div className="flex flex-col items-center text-center bg-white shadow-lg hover:shadow-2xl rounded-lg transition-shadow duration-300 w-full max-w-[240px] md:w-96 md:justify-self-end">
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
