// Spotide/src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase"; // Supabaseの設定があるファイル
import { NextApiRequest, NextApiResponse } from "next";

// NextAuth のオプションを設定
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user?.id) {
        // SupabaseにGoogleアカウント情報を保存
        const { data, error } = await supabase.from("users").upsert({
          google_id: user.id,
          user_name: user.name || "未設定",
        });

        if (error) {
          console.error("ユーザー情報の保存エラー:", error);
          return false; // エラーが発生した場合、サインインを拒否
        }
      }
      return true;
    },
  },
};

// GET メソッドの処理
export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};

// POST メソッドの処理
export const POST = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};
