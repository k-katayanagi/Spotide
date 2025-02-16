'use client'
import React from "react";

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  options: Option[];
  title: string; 
  onSelect: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

const ListSelect: React.FC<Props> = ({ options, title,onSelect, className}) => { 
  return (
    <div className="w-full flex flex-col items-start">
    <label className="block w-[100px]">{title}</label>
    <select
      onChange={(e) => onSelect(e.target.value)}
      className={`border border-black rounded-md ${className}`}
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
