'use client';

import { signIn } from 'next-auth/react';
import RegistrationButton from '@/components/buttons/RegistrationButton';
import LoginButton from '@/components/buttons/LoginButton';
import TopButton from '@/components/buttons/TopButton';

const Registry = () => {
  const handleRegistration = async () => {
    console.log('Google アカウントで新規登録開始');

    const result = await signIn('google', {
      callbackUrl: '/user/mypage', // 新規登録成功後のリダイレクト先
    });

    if (result?.error) {
      alert(`新規登録に失敗しました: ${result.error}`);
      window.location.href = '/registry';
    }
  };

  const handleLogin = async () => {
    console.log('Googleアカウントでログイン開始');

    const result = await signIn('google', {
      callbackUrl: '/user/mypage', // ログイン成功後のリダイレクト先
    });

    if (result?.error) {
      alert(`ログインに失敗しました: ${result.error}`);
      window.location.href = '/login';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen transform translate-y-[-60px] space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
      <div className="flex flex-col items-center justify-center w-full max-h-full overflow-y-auto sm:mt-0 md:mt-0 space-y-1">
        <h1 className="mt-4 mb-3 font-bold text-lg sm:text-xl md:text-2xl">
          新規会員登録はこちら
        </h1>
        <RegistrationButton onClick={handleRegistration} />
      </div>

      <div className="flex flex-col items-center justify-center mt-4 space-y-1">
        <h1 className="mt-4 mb-3 font-bold text-lg sm:text-xl md:text-2xl">
          アカウントをお持ちの方はこちら
        </h1>
        <LoginButton onClick={handleLogin} />
      </div>

      <div className="flex flex-col items-center justify-center mt-4 space-y-1">
        <TopButton />
      </div>
    </div>
  );
};

export default Registry;
