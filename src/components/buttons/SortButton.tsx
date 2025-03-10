"use client";

import Button from "@components/Button";

interface Props {
  className?: string;
  disabled?:boolean;
  onClick: () => void;
}

const SortButton = ({ className,disabled,onClick }: Props) => {
  return (
    <Button
      className={`items-center justify-center text-black w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]  ${className}`}
      disabled={disabled}
      onClick={onClick}
      text={<>↓↑三</>}
    />
  );
};

export default SortButton;
