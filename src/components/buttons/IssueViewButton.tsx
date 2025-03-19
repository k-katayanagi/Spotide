'use client';

import { useState } from 'react';
import Button from '@components/Button';
import useNavigation from "@/hooks/useNavigation";

interface Props {
    className?: string; 
}

const IssueViewButton = ({ className }: Props) => {
  const { handleNavigateTo } = useNavigation();
  const [isIssued, setIsIssued] = useState(false);

  const handleClick = () => {
    if (!isIssued) {
      // URL発行処理（仮）ここにAPI通信などを追加
      console.log('URL発行');
      setIsIssued(true);
    } else {
      handleNavigateTo('/');
    }
  };

  return (
    <Button
      className={`group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full 
                 bg-white border-4 border-[#FF5722] px-9 font-medium text-black transition-all duration-300 
                 hover:bg-gradient-to-r hover:from-[#FF7043] hover:via-[#FF5722] hover:to-[#F4511E] 
                 hover:shadow-2xl transform hover:scale-[1.02]  ${className}`}
      onClick={handleClick}
      text={
        <>
          <span className="absolute h-0 w-0 rounded-full bg-[#FF8A65] transition-all duration-300 group-hover:h-60 group-hover:w-60"></span>
          <span className="relative flex items-center justify-center">
            {isIssued ? '閲覧する' : '閲覧URL発行'}
          </span>
        </>
      }
    />
  );
};

export default IssueViewButton;
