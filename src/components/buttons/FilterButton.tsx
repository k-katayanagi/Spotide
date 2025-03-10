"use client";

import Button from "@components/Button";

interface Props {
  className?: string;
  disabled?: boolean;
  onClick: () => void; // 親から渡されたクリック時のハンドラーを受け取る
}

const FilterButton = ({ className, disabled, onClick }: Props) => {
  return (
    <Button
      className={`items-center justify-center text-black w-[25px] h-[25px] sm:w-[50px] sm:h-[50px] ${className}`}

      disabled={disabled}
      onClick={onClick} // 親から渡されたクリックイベントを呼び出す
      text={<>{"↓↑"}</>}
    />
  );
};

export default FilterButton;
