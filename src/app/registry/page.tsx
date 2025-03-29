"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import RegistrationButton from "@/components/buttons/RegistrationButton";
import LoginButton from "@/components/buttons/LoginButton";
import TopButton from "@/components/buttons/TopButton";

const Registry = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  // 新規登録処理
  const handleRegistration = async () => {
    console.log("Google アカウントで新規登録開始");
  
    const result = await signIn("google", {
      // callbackUrl: "/user/mypage", // 新規登録成功後のリダイレクト先
    });
  
    if (result?.error) {
      setRegistrationError(`新規登録に失敗しました: ${result.error}`);
      return;
    }
  
    // Google ID が取得できたか確認
    const googleId = result?.user?.id;
    if (!googleId) {
      setRegistrationError("Google ID が取得できませんでした");
      return;
    }
  
    // Googleアカウントで登録されているか確認する
    const res = await fetch("/api/auth/check-google-id", {
      method: "POST",
      body: JSON.stringify({ google_id: googleId }),
    });
    const data = await res.json();
  
    if (data.exists) {
      setRegistrationError("このアカウントはすでに登録済みです");
    } else {
      setRegistrationError("");
      // window.location.href = "/user/mypage"; // 新規登録後にmypageへ遷移
    }
  };
  
  

  // ログイン処理
  const handleLogin = async () => {
    console.log("Googleアカウントでログイン開始");

    const result = await signIn("google", {
      // callbackUrl: "/user/mypage", // ログイン成功後のリダイレクト先
    });

    if (result?.error) {
      setErrorMessage(`ログインに失敗しました: ${result.error}`);
      return;
    }

    // Google ID が取得できたか確認
    const googleId = result?.user?.id;
    if (!googleId) {
      setErrorMessage("Google ID が取得できませんでした");
      return;
    }

    console.log("Google ID:", googleId); // Google ID を確認

    // Googleアカウントで存在するか確認
    const res = await fetch("/api/auth/check-google-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ヘッダーを追加してJSONデータを送信
      },
      body: JSON.stringify({ google_id: googleId }), // Google ID を送信
    });

    const data = await res.json();

    if (data.error) {
      setErrorMessage(`エラーが発生しました: ${data.error}`);
      return;
    }

    if (data.exists) {
      setErrorMessage("");
      window.location.href = "/user/mypage"; // ログイン後にmypageへ遷移
    } else {
      setErrorMessage("未登録です。新規登録してください。");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen transform translate-y-[-60px] space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
      <div className="flex flex-col items-center justify-center w-full max-h-full overflow-y-auto sm:mt-0 md:mt-0 space-y-1">
        <h1 className="mt-4 mb-3 font-bold text-lg sm:text-xl md:text-2xl">
          新規会員登録はこちら
        </h1>
        <RegistrationButton onClick={handleRegistration} />
        {registrationError && <div className="text-red-500">{registrationError}</div>}
      </div>

      <div className="flex flex-col items-center justify-center mt-4 space-y-1">
        <h1 className="mt-4 mb-3 font-bold text-lg sm:text-xl md:text-2xl">
          アカウントをお持ちの方はこちら
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

export default Registry;
