import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user?.id) return false;

      // 新規登録処理
      const { error: upsertError } = await supabase
        .from("users")
        .upsert(
          {
            google_id: user.id,
            user_name: user.name || "未設定", // 名前が未設定の場合は「未設定」として登録
          },
          { onConflict: ["google_id"] } // google_idが重複していた場合は更新する
        );

      if (upsertError) {
        console.error("Supabaseエラー:", upsertError);
        return false;
      }

      return true; // 新規登録が成功した場合
    },

    async jwt({ token, account }) {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.access_token) {
        session.accessToken = token.access_token;
      }

      return session;
    },
  },
};

export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);
