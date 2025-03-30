"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import LoginButton from "@/components/buttons/LoginButton";
import TopButton from "@/components/buttons/TopButton";

const  Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  
  // ログイン処理
  const handleLogin = async () => {
    console.log("Googleアカウントでログイン開始");

    const result = await signIn("google", {
      callbackUrl: "/user/mypage",
    });

    if (result?.error) {
      setErrorMessage(`ログインに失敗しました: ${result.error}`);
      return;
    }

  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen transform translate-y-[-60px] space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
      <div className="flex flex-col items-center justify-center w-full max-h-full overflow-y-auto sm:mt-0 md:mt-0 space-y-1">
        <h1 className="mt-4 mb-3 font-bold text-lg sm:text-xl md:text-2xl">
          ログインはこちら
        </h1>
        <LoginButton onClick={handleLogin} />
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </div>
      <div className="flex flex-col items-center justify-center mt-4 space-y-1">
        <TopButton />
      </div>
    </div>
  );
};

export default Login;
