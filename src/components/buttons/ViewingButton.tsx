'use client';

import Button from '@components/Button';
import useNavigation from "@/hooks/useNavigation";

interface Props {
    className?: string; 
}

const ViewingButton = ({ className }: Props) => {
  const { handleNavigateTo } = useNavigation();
  return (
    <Button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-medium text-neutral-50 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 hover:shadow-2xl transform hover:scale-102 mt-5 ${className}`}
      style={{ width: '200px', height: '50px' }}
      onClick={() => handleNavigateTo('/')}
      text={
        <>
          <span className="absolute h-0 w-0 rounded-full bg-blue-300 transition-all duration-300 group-hover:h-56 group-hover:w-32"></span>
          <span className="relative flex items-center justify-center">閲覧</span> {/* 横並びに中央揃え */}
        </>
      }
    />
  );
};

export default ViewingButton;
