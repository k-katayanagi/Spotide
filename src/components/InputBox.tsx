import React from "react";

type Props = {
  type?: "text" | "email" | "password" | "search";
  placeholder?: string;
  value?: string;
  onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void; 
  width?: string;
  height?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputBox: React.FC<Props> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  width = "200px",
  height = "40px",
  disabled = false,
  style,
  ...restProps
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${className}`}  // ここで TailwindCSS のクラスを適用
      style={{ width, height, ...style }} // 親コンポーネントから渡された width と height を適用
      disabled={disabled} 
      {...restProps}
    />
  );
};

export default InputBox;
