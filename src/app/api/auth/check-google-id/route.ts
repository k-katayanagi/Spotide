// /app/api/auth/check-google-id/route.ts

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { google_id } = await request.json();
    console.log("Received google_id:", google_id); // ここで確認

    if (!google_id) {
      return NextResponse.json({ error: "google_idが送信されていません" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("users")
      .select("google_id")
      .eq("google_id", google_id)
      .single();

    if (error) {
      return NextResponse.json({ error: "DBエラー" }, { status: 500 });
    }

    return NextResponse.json({ exists: !!data }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error); // エラーログを追加
    return NextResponse.json({ error: "予期しないエラーが発生しました" }, { status: 500 });
  }
}
