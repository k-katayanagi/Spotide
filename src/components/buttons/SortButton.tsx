"use client";

import Button from "@components/Button";
import Image from "next/image";

interface Props {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const SortButton = ({ className, disabled, onClick }: Props) => {
  return (
    <Button
      className={`items-center justify-center text-black w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]  ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <Image
        src="/images/sort.svg"
        alt="ソート"
        className="w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]"
      />
    </Button>
  );
};

export default SortButton;
