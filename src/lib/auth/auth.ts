import { supabase } from "../supabase";

// Google でサインイン（ログイン）
export const signInWithGoogle = async () => {
  try {
    // Googleで認証する
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // 認証後にリダイレクトされるURL
      },
    });

    if (error) {
      console.error("ログインエラー:", error.message);
      return;
    }
    console.log("Googleログインのためのリダイレクトが完了しました");
  } catch (error) {
    console.error("ログイン処理で例外発生:", error);
  }
};

// Google でサインアップ（新規登録）
export const signUpWithGoogle = async () => {
  try {
    // Googleで認証する
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // 認証後にリダイレクトされるURL
      },
    });

    if (error) {
      console.error("サインアップエラー:", error.message);
      return;
    }
    console.log("Googleサインアップのためのリダイレクトが完了しました");
  } catch (error) {
    console.error("サインアップ処理で例外発生:", error);
  }
};

// 認証後にコールバックで呼ばれる関数（リダイレクト先で呼び出す）
export const handleAuthCallback = async () => {
  try {
    // セッション情報を取得
    const { data: session, error } = await supabase.auth.getSession();
    
    // セッションが存在しない場合や、ユーザー情報がない場合
    if (error || !session || !session.user) {
      console.error("ユーザー情報が取得できませんでした");
      return;
    }

    const user = session.user;

    // ユーザー情報が取得できた場合
    console.log("ユーザー情報取得成功", user);

    // ユーザー情報をusersテーブルに保存
    const { error: dbError } = await supabase.from("users").upsert(
      {
        google_id: user.id, // Google IDを保存
        user_name: user.user_metadata?.full_name || "未設定",
        user_id: user.id, // user_idとしてgoogle_idを使用
      },
      { onConflict: "google_id" } // google_idが重複した場合は上書き
    );

    if (dbError) {
      console.error("usersテーブルへの保存エラー:", dbError.message);
    } else {
      console.log("ユーザー情報が保存されました");
    }
  } catch (error) {
    console.error("認証後の処理で例外発生:", error);
  }
};


// ログアウト
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("ログアウトエラー:", error.message);
  }
};

// セッションを取得
export const getSession = async () => {
  try {
    const session = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("セッション取得エラー:", error.message);
    return null;
  }
};
