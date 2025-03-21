"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // 現在のURLを取得

  // ログイン不要なページ
  const publicRoutes = ["/login", "/registry"];

  useEffect(() => {
    if (status === "loading") return; // ロード中は何もしない

    // セッションがない場合、`/login`や`/registry`以外のページにアクセスするとトップページにリダイレクト
    if (!session && !publicRoutes.includes(pathname)) {
      router.push("/"); // `/login` や `/registry` 以外はトップにリダイレクト
    }
  }, [session, status, router, pathname]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session && !publicRoutes.includes(pathname)) return null;

  return <>{children}</>;
};

export default AuthGuard;
