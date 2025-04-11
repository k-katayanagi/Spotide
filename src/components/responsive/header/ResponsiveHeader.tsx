'use client';
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import LogoutButton from '@/components/buttons/LogoutButton';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const ResponsiveHeader = () => {
  const { data: session } = useSession(); // セッション情報を取得

  // ログアウト処理
  const handleLogout = async () => {
    // 参加認証済みフラグを削除
    localStorage.removeItem('isAuthenticated');
    signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="flex items-center justify-between lg:justify-start p-2 text-white w-full">
      {/* 共通のSpotide部分 */}
      <div className="flex-1 flex justify-center lg:justify-start">
        <Image
          src="/images/spotideLogo.svg"
          alt="ユーザー名変更アイコン"
          width={200}
          height={100}
          priority
          className="w-[120px] h-[60px] sm:w-[150px] sm:h-[75px] md:w-[180px] md:h-[90px] lg:w-[250px] lg:h-[100px]"
        />
      </div>

      {/* モバイル用ナビゲーション */}
      <div className="nav-mobile block lg:hidden">
        {/* モバイル表示時の内容 */}
      </div>

      {/* PC用ナビゲーション */}
      <div className="nav-pc hidden lg:flex items-center justify-center space-x-9">
        <HeaderNavigation />
        {session && <LogoutButton onClick={handleLogout} />}
      </div>
    </header>
  );
};

export default ResponsiveHeader;
