"use client";

import Image from "next/image";
import useNavigation from "@/hooks/useNavigation";
import { useSession } from "next-auth/react"; // useSession をインポート

const HeaderNavigation = () => {
  const { data: session } = useSession(); // セッションデータを取得
  const { handleNavigateTo } = useNavigation();

  return (
    <nav className="desktop-nav flex justify-center items-center w-full">
      <ul className="flex space-x-8">
        <li className="text-black hover:text-gray-300 text-lg text-center">
          <Image
            src="/images/top.svg"
            alt="TOPアイコン"
            width={50}
            height={50}
            priority
          />
          <label className="block">TOP</label>
        </li>
        
        {/* セッションがある場合のみ表示されるメニュー */}
        {session && (
          <>
            <li
              className="text-black hover:text-gray-300 text-lg text-center cursor-pointer"
              onClick={() =>
                handleNavigateTo(`/user/${session.user.id}/list_create`)
              } // 動的にユーザーIDを挿入
            >
              <Image
                src="/images/createList.svg"
                alt="リスト作成アイコン"
                width={50}
                height={50}
                priority
              />
              <label className="block">リスト作成</label>
            </li>

            <li
              className="text-black hover:text-gray-300 text-lg text-center cursor-pointer"
              onClick={() =>
                handleNavigateTo(`/user/${session.user.id}/individual_list`)
              } // 動的にユーザーIDを挿入
            >
              <Image
                src="/images/individualList.svg"
                alt="個人リスト"
                width={50}
                height={50}
                priority
              />
              <label className="block">個人リスト</label>
            </li>

            <li
              className="text-black hover:text-gray-300 text-lg text-center cursor-pointer"
              onClick={() =>
                handleNavigateTo(`/user/${session.user.id}/share_list`)
              } // 動的にユーザーIDを挿入
            >
              <Image
                src="/images/shareList.svg"
                alt="共有リスト"
                width={50}
                height={50}
                priority
              />
              <label className="block">共有リスト</label>
            </li>

            <li
              className="text-black hover:text-gray-300 text-lg text-center cursor-pointer"
              onClick={() =>
                handleNavigateTo(`/user/mypage`)
              } 
            >
              <Image
                src="/images/myPage.svg"
                alt="マイページ"
                width={50}
                height={50}
                priority
              />
              <label className="block">マイページ</label>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
