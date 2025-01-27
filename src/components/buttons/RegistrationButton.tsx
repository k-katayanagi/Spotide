'use client';

import Button from '@components/Button';
import { signIn } from 'next-auth/react';

const RegistrationButton = () => {
  const handleRegistration = () => {
    console.log("Attempting Google SignIn");
    signIn('google');  // Google認証を開始
  }
  return (
    <Button
      text="Googleアカウントで登録"
      onClick={handleRegistration}
      className="bg-blue-500 hover:bg-blue-600"
    />
  );
};

export default RegistrationButton;