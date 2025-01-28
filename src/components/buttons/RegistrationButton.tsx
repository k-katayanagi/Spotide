'use client';

import Button from '@components/Button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const RegistrationButton = () => {
  const handleRegistration = () => {
    console.log("Attempting Google SignIn");
    signIn('google');  // Google認証を開始
  }
  return (
    <Button
    onClick={handleRegistration}
    className="flex items-center justify-center w-full max-w-xs px-4 py-2 text-sm font-medium"
    text={
      <div className="flex items-center">
        <Image
          src="/images/web_light_rd_SU.svg"
          alt="Googleで会員登録"
          width={500}
          height={500}
          className="mr-2 object-contain"
        />
      </div>
    }
  />
  );
};

export default RegistrationButton;