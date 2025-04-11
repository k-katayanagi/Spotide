'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { BottomNavProvider } from '@/contexts/BottomNavContext';
import { NextAuthProvider } from '@/lib/NextAuthProvider';
import { Session } from 'next-auth';

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <ChakraProvider>
      <BottomNavProvider>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </BottomNavProvider>
    </ChakraProvider>
  );
}
