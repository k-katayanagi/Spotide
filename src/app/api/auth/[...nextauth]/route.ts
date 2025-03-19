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
    // Supabase にユーザー情報を保存
    async signIn({ user }) {
      if (!user?.id) return false;

  
      const { data, error } = await supabase
        .from("users")
        .upsert(
          {
            google_id: user.id,
            user_name: user.name || "未設定",
          },
          { onConflict: ["google_id"] }
        )
        .select();

      if (error) {
        console.error("Supabaseエラー:", error);
        return false;
      }

        console.log(data)
      if (data && data.length > 0) {
        user.user_id = data[0].user_id; 
        console.log("User ID set in user object:", user.user_id); 
      }

      return true;
    },
  
    async jwt({ token, user, account }) {
      if (user?.user_id) {
        token.user_id = user.user_id; // user_id をトークンにセット
        console.log("User ID set in token:", token.user_id);
      }

      // Google 認証の場合に access_token をトークンにセット
      if (account?.access_token) {
        token.access_token = account.access_token;
        console.log("Access Token set in token:", token.access_token); 
      }

      return token;
    },
    // session コールバックで session に user_id と access_token を追加
    async session({ session, token }) {
      if (token?.user_id) {
        session.user = {
          ...session.user,
          id: token.user_id, 
        };
      }

      if (token?.access_token) {
        session.accessToken = token.access_token; // トークンから access_token を取得して session にセット
      }

      return session;
    },
    // redirect コールバックで user_id に基づいてリダイレクト
    async redirect({ url, baseUrl, token }) {
      console.log("Base URL:", baseUrl);
      console.log("Token User ID:", token?.user_id); 

      if (token?.user_id) {
        const redirectUrl = `${baseUrl}/user/${token.user_id}/mypage`; // user_id があれば、mypage にリダイレクト
        console.log("Redirecting to:", redirectUrl); 
        return redirectUrl;
      }

      return baseUrl; // user_id がない場合はホームにリダイレクト
    },
  },
};

// `NextAuth` をデフォルトエクスポートする代わりに、HTTP メソッドを個別にエクスポート
export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);
