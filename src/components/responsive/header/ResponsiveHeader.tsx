"use client";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import LoginButton from "@/components/buttons/LoginButton";
import Image from "next/image";

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
        <LoginButton />
      </div>
    </header>
  );
};

export default ResponsiveHeader;
