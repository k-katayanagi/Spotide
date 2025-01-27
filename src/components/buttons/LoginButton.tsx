'use client';

import Button from '@components/Button';
import { signIn } from 'next-auth/react';


const LoginButton = () => {
  const handleLogin = () => {
    console.log("Attempting Google SignIn");
    signIn('google');  // Google認証を開始
  }
  return (
    <Button
      text="ログイン"
      onClick={handleLogin}
      className="bg-blue-500 hover:bg-blue-600"
    />
  );
};

export default LoginButton;