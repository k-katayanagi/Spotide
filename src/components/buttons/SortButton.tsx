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
      className={`items-center justify-center mt-5 text-black ${className}`}
      style={{ width: "50px", height: "50px" }}
      disabled={disabled}
      onClick={onClick}
      text={<>↓↑三</>}
    />
  );
};

export default SortButton;
