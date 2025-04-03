import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '@/lib/supabase';
import { JWT } from 'next-auth/jwt';
import { User, Session, Account } from 'next-auth';

interface ExtendedJWT extends JWT {
  userId?: string;
  access_token?: string;
}

interface ExtendedSession extends Session {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user?.email) return false;

      const { data, error: upsertError } = await supabase
        .from('users')
        .upsert(
          {
            google_id: user.id,
            user_name: user.name || '未設定',
          },
          { onConflict: 'google_id' },
        )
        .select();

      if (upsertError) {
        console.error('Supabaseエラー:', upsertError);
        return false;
      }

      if (data && data[0]?.user_id) {
        user.id = data[0].user_id;
      }

      return true;
    },

    async jwt({
      token,
      account,
      user,
    }: {
      token: ExtendedJWT;
      account: Account | null;
      user: User;
    }) {
      if (user?.id) {
        token.userId = user.id;
      }

      if (account?.access_token) {
        token.access_token = account.access_token;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: ExtendedJWT;
    }) {
      if (token?.userId) {
        session.user.id = token.userId;
      }

      if (token?.access_token) {
        session.accessToken = token.access_token;
      }

      return session;
    },
  },
};
