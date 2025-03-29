import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";
import { TUsers } from "@/types/UserTypes ";

// authOptionsの型指定
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // signIn コールバック
    async signIn({ user }: { user: User }) {
      if (!user?.email) return false;

      // Google ID を使ってユーザーを登録または更新
      const { data, error: upsertError } = await supabase
        .from<TUsers>("users")
        .upsert(
          {
            google_id: user.id,
            user_name: user.name || "未設定", // 名前が未設定の場合は「未設定」として登録
          },
          { onConflict: "google_id" }
        ).select();

      if (upsertError) {
        console.error("Supabaseエラー:", upsertError);
        return false;
      }

      // ユーザーIDをuser.idに設定
      if (data && data[0]?.user_id) {
        user.id = data[0].user_id; // Supabaseのuser_idをuser.idに設定
      }

      return true;
    },

    // jwt コールバック
    async jwt({
      token,
      account,
      user,
    }: {
      token: any;
      account: any;
      user: User; 
    }) {
      if (user?.id) {
        token.userId = user.id; // ユーザーIDをトークンに保存
      }

      if (account?.access_token) {
        token.access_token = account.access_token; // アクセストークンを保存
      }

      return token;
    },

    // session コールバック
    async session({ session, token }: { session: any; token: any }) {
      if (token?.userId) {
        session.user.id = token.userId; // トークンからユーザーIDをセッションに追加
      }

      if (token?.access_token) {
        session.accessToken = token.access_token; // アクセストークンをセッションに追加
      }

      return session;
    },
  },
};

export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);
