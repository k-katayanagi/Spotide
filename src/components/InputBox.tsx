"use client";
import React from "react";

type Props = {
  type?: "text" | "email" | "password" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputBox: React.FC<Props> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  disabled = false,
  ...restProps
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${className}`} // ここで TailwindCSS のクラスを適用
      disabled={disabled}
      {...restProps}
    />
  );
};

export default InputBox;
