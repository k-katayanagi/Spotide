"use client";

import { useState } from "react";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const ResponsiveFooter = () => {
  const [isVisible, setIsVisible] = useState(true);

  const hideBottomNav = () => {
    setIsVisible(false);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();

  return (
    <>
      {/* BottomNavigationクリック検知用 */}
      {isVisible && (
        <div onClick={hideBottomNav} className="fixed inset-0 z-10" />
      )}

      <footer className="fixed bottom-0 left-0 w-full z-30">
        {/* モバイル用 */}
        <div
          onClick={stopPropagation}
          className={`lg:hidden bg-white border-t-4 border-t-[#FF5722] transition-transform duration-300 ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <BottomNavigation />
        </div>

        {/* BottomNavigationが非表示のとき、再表示用ハンドル */}
        {!isVisible && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-2 z-30 lg:hidden">
            <div
              onClick={() => setIsVisible(true)}
              className="w-16 h-2 bg-[#FF5722] rounded-full cursor-pointer"
            />
          </div>
        )}

        {/* PC用*/}
        <p className="hidden lg:block bg-white text-center text-sm py-2">
          Developed by kkatayanagi - Spotide © 2025
        </p>
      </footer>
    </>
  );
};

export default ResponsiveFooter;
