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
  session: Session | null; // sessionを受け取る
}) {
  return (
    <ChakraProvider>
      <BottomNavProvider>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>{' '}
        {/* sessionを渡す */}
      </BottomNavProvider>
    </ChakraProvider>
  );
}
