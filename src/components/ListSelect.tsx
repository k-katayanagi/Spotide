'use client'
import React from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  title: string; 
  onSelect: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

const ListSelect: React.FC<Props> = ({ options, title,onSelect, className, style }) => { 
  return (
    <div className="m-auto">
      <label className="block">{title}</label>
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
    </div>
  );
};

export default ListSelect;
