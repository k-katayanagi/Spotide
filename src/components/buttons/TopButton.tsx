'use client';

import Button from '@components/Button';
import useNavigation from '@/hooks/useNavigation';

const TopButton = () => {
  const { handleNavigateTo } = useNavigation();
  return (
    <Button
      className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-9 font-medium text-neutral-50 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-400 hover:via-pink-500 hover:to-pink-600 hover:shadow-2xl transform hover:scale-102 mt-5"
      onClick={() => handleNavigateTo('/')}
      text={
        <>
          <span className="absolute h-0 w-0 rounded-full bg-pink-300 transition-all duration-300 group-hover:h-56 group-hover:w-32"></span>
          <span className="relative">TOP</span>
        </>
      }
    />
  );
};

export default TopButton;
