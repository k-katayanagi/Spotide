import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { supabase } from "./lib/supabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const { data: existingUser } = await supabase
          .from("users")
          .select()
          .eq("google_id", account?.providerAccountId)
          .single();

        if (!existingUser) {
          await supabase
            .from("users")
            .insert({
              google_id: account?.providerAccountId,
              user_name: user.name,
            })
            .single();
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        token.googleId = account.providerAccountId;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.googleId) {
        try {
          const { data: user } = await supabase
            .from("users")
            .select("user_id")
            .eq("google_id", token.googleId)
            .single();

          if (user) {
            session.user.id = user.user_id;
          }
        } catch (error) {
          console.error(error);
        }
      }

      return session;
    },
  },
});
