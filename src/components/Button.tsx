import React from 'react';

type ButtonProps = {
  text: React.ReactNode; // ボタン中身
  onClick: React.MouseEventHandler<HTMLButtonElement>; // onClick イベントの型

} & React.ButtonHTMLAttributes<HTMLButtonElement>; // ボタン要素のその他の属性


const Button = (props: ButtonProps) => {
  const { text, onClick, className = '', ...restProps } = props;


  return (
    <button
      className={`${className}`} 
      onClick={onClick}
      {...restProps}
    >
      {text} {/* ボタンの中身 */}
    </button>
  );
};

export default Button;
