import React from 'react';

type ButtonProps = {
  text: React.ReactNode; // ボタン中身
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // onClick イベントの型
  variant?: 'primary'
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // ボタン要素のその他の属性

// variantが'primaryのCSSクラスを返す関数
const getVariantClass = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'btn-primary';
    default:
      return '';
  }
};

const Button = (props: ButtonProps) => {
  const { text, onClick, variant = '', className = '', ...restProps } = props;

  // variantがある場合、事前に定義したクラスを取得
  const variantClass = getVariantClass(variant);
 // variantクラスが指定されていればそれを優先し、なければclassNameを使う
  const finalClassName = variantClass || className;

  return (
    <button 
      className={`btn ${finalClassName}`} // どちらかのクラスを適用
      onClick={onClick} 
      {...restProps}
    >
      {text}
    </button>
  );
};

export default Button;
