'use client';

import Button from '../Button';
import Image from 'next/image';

interface Props {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const FilterButton = ({ className, disabled, onClick }: Props) => {
  return (
    <Button
      className={`items-center justify-center text-black w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] ${className}`}
      disabled={disabled}
      onClick={onClick}
      text={
        <Image
          src="/images/filter.svg"
          alt="フィルターボタン"
          className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
          height={20}
          width={20}
        />
      }
    />
  );
};

export default FilterButton;
