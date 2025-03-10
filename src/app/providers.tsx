"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { BottomNavProvider } from "@/contexts/BottomNavContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <BottomNavProvider>{children}</BottomNavProvider>
    </ChakraProvider>
  );
}
