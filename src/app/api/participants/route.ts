import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 日本時間に変換する関数（Dateオブジェクトを作成）
const convertToJST = (date: string | Date): string => {
  const dateObj = new Date(date);
  const offset = 9 * 60;
  dateObj.setMinutes(dateObj.getMinutes() + offset);
  return dateObj.toISOString();
};

//参加者取得
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const listId = url.searchParams.get("list_id");

    if (!listId) {
      return NextResponse.json(
        { error: "list_id is required" },
        { status: 400 }
      );
    }

    // DBからlist_participantsテーブルのデータを取得
    const { data, error } = await supabase
      .from("list_participants")
      .select("participant_id, participant_name, password, user_id,is_guest")
      .eq("list_id", listId); // list_idを条件にデータを取得

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//参加者追加
export async function POST(req: Request) {
  try {
    // リクエストボディからデータを取得
    const { participant_name, password, list_id } = await req.json();

    // 必要なデータをSupabaseにインサート
    const { data, error } = await supabase
      .from("list_participants")
      .insert([
        {
          participant_name,
          password,
          list_id,
          created_at: convertToJST(new Date()),
          updated_at: convertToJST(new Date()),
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "参加者が追加されました！", data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "参加者の追加に失敗しました", error },
      { status: 500 }
    );
  }
}

// 参加者削除
export async function DELETE(req: Request) {
  try {
    const { participant_id } = await req.json();

    if (!participant_id) {
      return NextResponse.json(
        { error: "participant_id is required" },
        { status: 400 }
      );
    }

    // Supabase から参加者を削除
    const { error } = await supabase
      .from("list_participants")
      .delete()
      .eq("participant_id", participant_id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: "参加者が削除されました！" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "参加者の削除に失敗しました", error },
      { status: 500 }
    );
  }
}

//参加者編集
export async function PUT(req: Request) {
  try {
    // リクエストボディからデータを取得
    const { participant_id, participant_name, password, list_id } =
      await req.json();

    if (
      !participant_id ||
      !participant_name ||
      !password ||
      list_id === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "participant_id, participant_name, password, and list_id are required",
        },
        { status: 400 }
      );
    }

    // Supabaseから指定した参加者を更新
    const { data, error } = await supabase
      .from("list_participants")
      .update({
        participant_name,
        password,
        list_id, // list_id を更新
        updated_at: convertToJST(new Date()), // 更新時刻を設定
      })
      .eq("participant_id", participant_id)
      .select()
      .single();


    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: "参加者が更新されました！", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "参加者の更新に失敗しました", error: error.message },
      { status: 500 }
    );
  }
}
