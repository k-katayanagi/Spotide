'use client';

import Button from '@components/Button';

interface Props {
  className?: string;
  onClick?: () => void;
  isEditing?: boolean | undefined;
}

const EditButton = ({ className, onClick, isEditing = false }: Props) => {
  return (
    <Button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full
        ${
          isEditing
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 font-medium text-neutral-50 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 hover:shadow-2xl transform hover:scale-105'
        }
        px-6 py-2 text-base md:text-lg lg:text-xl
        min-w-[30px] w-[100px] max-w-[100px] min-h-[10px] h-[50px]  max-h-[50px] whitespace-nowrap ${className}`}
      onClick={onClick}
      text={
        <>
          <span className="absolute h-0 w-0 rounded-full bg-green-300 transition-all duration-300 group-hover:h-[50px] group-hover:w-[100px]"></span>
          <span className="relative flex items-center justify-center">
            {isEditing ? '編集中' : '編集'}
          </span>
        </>
      }
    />
  );
};

export default EditButton;
