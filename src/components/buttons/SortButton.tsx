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
      className={`items-center justify-center text-black w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]  ${className}`}
      disabled={disabled}
      onClick={onClick}
      text={
        <Image
          src="/images/sort.svg"
          alt="ソート"
          className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
          width={20}
          height={20}
        />
      }
    />
  );
};

export default SortButton;
