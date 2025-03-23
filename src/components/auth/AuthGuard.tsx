// components/auth/AuthGuard.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login", "/registry"];

  useEffect(() => {
    if (loading) return;

    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/"); // ログインしていない場合はトップにリダイレクト
    }

    if (user && publicRoutes.includes(pathname)) {
      router.push(`/user/${user.id}/mypage`); // ログインしている場合はマイページにリダイレクト
    }
  }, [user, loading, router, pathname]);

  if (loading) return <p>Loading...</p>;
  if (!user && !publicRoutes.includes(pathname)) return null;

  return <>{children}</>;
};

export default AuthGuard;
