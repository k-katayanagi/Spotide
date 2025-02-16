'use client'
import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import LoginButton from '@/components/buttons/LoginButton';
import Image from 'next/image';

const ResponsiveHeader = () => {
  return (
    <header className="flex justify-between items-center p-2  text-white w-full">
      {/* 共通のSpotide部分 */}
      <div>
        <Image 
          src="/images/spotideLogo.svg" 
          alt="ユーザー名変更アイコン" 
          width={200} 
          height={100} 
          priority 
        />
      </div>

      {/* モバイル用ナビゲーション */}
      <div className="nav-mobile block lg:hidden">
        {/* モバイル表示時の内容 */}
      </div>

      {/* PC用ナビゲーション */}
      <div className="nav-pc hidden lg:flex space-x-4">
        <HeaderNavigation />
        <LoginButton />
      </div>
    </header>
  );
};

export default ResponsiveHeader;
