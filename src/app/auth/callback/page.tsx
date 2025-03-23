"use client";

// app/auth/callback/page.tsx
import { useEffect } from "react";
import { handleAuthCallback } from "@/lib/auth/auth";

const AuthCallback = () => {
  useEffect(() => {
    handleAuthCallback(); // コールバック処理を実行
  }, []);

  return <div>認証中...</div>;
};

export default AuthCallback;
