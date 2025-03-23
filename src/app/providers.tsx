"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/contexts/AuthContext"; // AuthProviderのインポート
import { BottomNavProvider } from "@/contexts/BottomNavContext"; // BottomNavProviderのインポート

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BottomNavProvider> {/* BottomNavProviderでラップ */}
          {children}
        </BottomNavProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
