'use client'
import React from "react";

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  options: Option[];
  onSelect: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

const ListSelect: React.FC<Props> = ({ options, onSelect, className, style }) => { 
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      style={{ width: "200px", height: "40px", ...style }} // デフォルトのサイズをCSSで固定、親から上書き可能
      className={`border border-black rounded-md ${className || ""}`} // 親からTailwindクラスを適用
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ListSelect;
