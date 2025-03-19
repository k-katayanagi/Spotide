"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import RegistrationButton from "@/components/buttons/RegistrationButton";
import LoginButton from "@/components/buttons/LoginButton";
import TopButton from "@/components/buttons/TopButton";

const Registry = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // セッションが確認できた場合、リダイレクト
      console.log("Authenticated, redirecting...");
      router.push(`/user/${session.user.id}/mypage`);
    }
  }, [session, status, router]);

  const handleRegistration = async () => {
    console.log("Attempting Google SignIn");

    const result = await signIn("google", {
      callbackUrl: "/redirecting",
    });

    if (result?.error) {
      alert(`ログインに失敗しました: ${result.error}`);
    } else {
      if (session?.user?.id) {
        router.push(`/user/${session.user.id}/mypage`);
      } else {
        alert("セッションの取得に失敗しました");
      }
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
        <LoginButton />
      </div>

      <div className="flex flex-col items-center justify-center mt-4 space-y-1">
        <TopButton />
      </div>
    </div>
  );
};

export default Registry;
