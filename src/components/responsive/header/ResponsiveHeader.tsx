import HeaderNavigation from '@/components/navigation/HeaderNavigation';
import LoginButton from '@/components/buttons/LoginButton';

const ResponsiveHeader = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white w-full">
      {/* 共通のSpotide部分 */}
      <div>
        Spotide<span>「集める、シェアする、決める。すべてSpotide。」</span>
      </div>

      {/* モバイル用ナビゲーション */}
      <div className="nav-mobile block lg:hidden">
        {/* モバイル表示時の内容 */}
      </div>

      {/* PC用ナビゲーション */}
      <div className="nav-pc hidden lg:block lg:flex space-x-4">
        <HeaderNavigation />
        <LoginButton/>
      </div>
    </header>
  );
};

export default ResponsiveHeader;
