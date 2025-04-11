'use client';

import React from 'react';
import Image from 'next/image';

type Props = {
  type?: 'text' | 'email' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onClick?: () => void;
  showImage?: boolean; // 画像を表示するかどうかを制御するプロパティ
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputBox: React.FC<Props> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  disabled = false,
  onClick,
  showImage = false,
  ...restProps
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${className} ${showImage ? 'pl-9' : ''}`}
        disabled={disabled}
        onClick={onClick}
        {...restProps}
      />
      {showImage && (
        <Image
          src="/images/search.svg"
          alt="search icon"
          className="absolute left-2  top-2 h-7 w-8 pr-2"
          height={20}
          width={20}
        />
      )}
    </div>
  );
};

export default InputBox;
