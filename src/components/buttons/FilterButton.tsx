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
      className={`items-center justify-center mt-5 text-black ${className}`}
      style={{ width: "50px", height: "50px" }}
      disabled={disabled}
      onClick={onClick} // 親から渡されたクリックイベントを呼び出す
      text={<>{"↓↑"}</>}
    />
  );
};

export default FilterButton;
