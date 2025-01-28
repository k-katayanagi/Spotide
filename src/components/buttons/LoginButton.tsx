'use client';

import Button from '@components/Button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

type Props = {
  imageWidth?: number;  // 画像の幅
  imageHeight?: number; // 画像の高さ
};

const LoginButton = (props:Props) => {
  const {imageWidth = 500,imageHeight= 500} = props
  const handleLogin = () => {
    console.log("Attempting Google SignIn");
    signIn('google');  // Google認証を開始
  }

  
  return (
    <Button
    onClick={handleLogin}
    className="flex items-center justify-center w-full max-w-xs px-4 py-2 text-sm font-medium"
    text={
      <div className="flex items-center">
        <Image
          src="/images/web_light_rd_SI.svg"
          alt="Googleでログイン"
          width={imageWidth}
          height={imageHeight}
          className="mr-2 object-contain"
        />
      </div>
    }
  />
  );
};

export default LoginButton;