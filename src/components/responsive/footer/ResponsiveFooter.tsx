'use client';

import { useBottomNav } from '@/contexts/BottomNavContext';
import BottomNavigation from '@/components/navigation/BottomNavigation';

const ResponsiveFooter = () => {
  const { isBottomNavOpen, setIsBottomNavOpen } = useBottomNav();

  return (
    <>
      {/* BottomNavigationクリック検知用 */}
      {isBottomNavOpen && (
        <div
          onClick={() => setIsBottomNavOpen(false)}
          className="fixed inset-0 z-10"
        />
      )}

      <footer className="fixed bottom-0 left-0 w-full z-30">
        {/* モバイル用 */}
        <div
          className={`lg:hidden bg-white border-t-2 border-t-[#FF5722] rounded-t-3xl transition-transform duration-300 ${
            isBottomNavOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <BottomNavigation />
        </div>

        {/* BottomNavigationが非表示のとき、再表示用ハンドル */}
        {!isBottomNavOpen && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-2 z-30 lg:hidden">
            <div
              onClick={() => setIsBottomNavOpen(true)}
              className="w-16 h-2 bg-[#FF5722] rounded-full cursor-pointer"
            />
          </div>
        )}

        {/* PC用 */}
        <p className="hidden lg:block bg-white text-center text-sm py-2">
          Developed by kkatayanagi - Spotide © 2025
        </p>
      </footer>
    </>
  );
};

export default ResponsiveFooter;
