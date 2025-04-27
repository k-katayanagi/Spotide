'use client';

import React from 'react';

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  options: Option[];
  title?: string;
  onSelect: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  placeholderColor?: string;
  value?: string | number;
};

const ListSelect: React.FC<Props> = ({
  options,
  title,
  onSelect,
  className,
  style,
  placeholder,
  placeholderColor = 'black',
  value,
}) => {
  return (
    <div className="w-full flex flex-col">
      <label className="block w-auto max-w-full">{title}</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className={`rounded-md h-[40px] ${className}`}
        style={{ ...style, color: value === '' ? placeholderColor : 'black' }} // value が空なら placeholderColor を適用
        value={value}
      >
        {/* プレースホルダーを最初の選択肢として追加 */}
        {placeholder && value === '' && (
          <option value="" disabled hidden style={{ color: placeholderColor }}>
            {placeholder}
          </option>
        )}
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
