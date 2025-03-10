"use client";

import Button from "../Button";
import Image from "next/image";

interface Props {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const FilterButton = ({ className, disabled, onClick }: Props) => {
  return (
    <Button
      className={`items-center justify-center text-black w-[25px] h-[25px] sm:w-[50px] sm:h-[50px] ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <Image
        src="/images/filter.svg"
        alt="フィルターボタン"
        className="w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]"
      />
    </Button>
  );
};

export default FilterButton;
