import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 日本時間に変換する関数（Dateオブジェクトを作成）
const convertToJST = (date: string | Date): string => {
  const dateObj = new Date(date);
  const offset = 9 * 60;
  dateObj.setMinutes(dateObj.getMinutes() + offset);
  return dateObj.toISOString();
};

// POST: リストを作成
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { listName, selectedType, voteDate, outingDate, userId } = body;

    // データ挿入
    const { data, error } = await supabase.from("lists").insert([
      {
        creator_id: userId,
        list_name: listName,
        list_type: selectedType,
        voting_start_at: convertToJST(voteDate),
        outing_at: convertToJST(outingDate),
        created_at: convertToJST(new Date()),
        updated_at: convertToJST(new Date()),
        is_voting_completed: false,
        is_aggregation_completed: false,
        status: 0,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "List created successfully", data });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// GET: リストを取得
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const listType = searchParams.get("listType") || "individual"; // デフォルトは "individual"

  if (!userId) {
    return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("creator_id", userId)
    .eq("list_type", listType); // listTypeを動的に指定

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
