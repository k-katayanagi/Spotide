"use client";

import Button from "@components/Button";

interface Props {
  className?: string;
  onClick?: () => void; 
}

const DeleteButton = ({ className, onClick }: Props) => {
  return (
    <Button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full 
      bg-gradient-to-r from-red-400 via-red-500 to-red-600 
      font-medium text-neutral-50 transition-all duration-300 
      hover:bg-gradient-to-r hover:from-pink-400 hover:via-pink-500 hover:to-pink-600 
      hover:shadow-2xl transform hover:scale-105 
      mt-5 px-6 py-2 text-base md:text-lg lg:text-xl 
      min-w-[30px] w-[100px] max-w-[100px] min-h-[10px] h-[50px] max-h-[50px] whitespace-nowrap ${className}`}
      onClick={onClick} 
      text={
        <>
          <span className="absolute h-0 w-0 rounded-full bg-pink-300 transition-all duration-300 group-hover:h-56 group-hover:w-32"></span>
          <span className="relative flex items-center justify-center">削除</span>
        </>
      }
    />
  );
};

export default DeleteButton;
