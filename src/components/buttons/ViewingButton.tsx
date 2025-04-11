'use client';

import Button from '@components/Button';

interface Props {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ViewingButton = ({ className, disabled = false, onClick }: Props) => {
  return (
    <Button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full 
        bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
        font-medium text-neutral-50 transition-all duration-300 
        hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-500 
        hover:to-blue-600 hover:shadow-2xl transform hover:scale-105
        px-6 py-2 text-base md:text-lg lg:text-xl
        min-w-[30px] w-[100px] max-w-[100px] min-h-[10px] h-[50px]  max-h-[50px] whitespace-nowrap 
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} 
        ${className}`}
      onClick={onClick}
      text={
        <>
          <span className="absolute h-0 w-0 rounded-full bg-blue-300 transition-all duration-300 group-hover:h-[50px] group-hover:w-[100px]"></span>
          <span className="relative flex items-center justify-center">
            閲覧
          </span>
        </>
      }
      disabled={disabled}
    />
  );
};

export default ViewingButton;
