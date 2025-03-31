import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// 日本時間に変換する関数（Dateオブジェクトを作成）
const convertToJST = (date: string | Date): string => {
  const dateObj = new Date(date);
  const offset = 9 * 60;
  dateObj.setMinutes(dateObj.getMinutes() + offset);
  return dateObj.toISOString();
};

// `photos` テーブルに新しい写真を追加または更新する関数
const addOrUpdatePhotoInDb = async (photoUrl: string, placeId: string) => {
  try {
    //place_idとphoto_urlの組み合わせがすでに存在するかチェック（なぜか同じ画像でphoto_urlがかわる）
    const { data, error } = await supabase
      .from("photos")
      .select("photos_id")
      .eq("place_id", placeId)
      .eq("photo_url", photoUrl)
      .maybeSingle();

    if (error) {
      console.error("Error checking photos table:", error.message);
      throw new Error("Error checking photos table");
    }

    if (data) {
      console.log("Photo already exists, updating the record");
      // すでに存在する場合は更新（更新の必要なカラムがあればこちらで設定）
      const { data: updatedData, error: updateError } = await supabase
        .from("photos")
        .update({ photo_url: photoUrl, place_id: placeId })
        .eq("photos_id", data.photos_id)
        .select();

      if (updateError) {
        console.error("Error updating photo:", updateError.message);
        throw new Error("Error updating photo");
      }

      return updatedData[0].photos_id; // 更新後のIDを返す
    }

    // 新しい写真を追加
    const { data: insertedData, error: insertError } = await supabase
      .from("photos")
      .insert([
        {
          photo_url: photoUrl,
          place_id: placeId,
        },
      ])
      .select();

    if (insertError) {
      console.error("Error inserting photo:", insertError.message);
      throw new Error("Error inserting photo");
    }

    return insertedData[0].photos_id; // 新しく挿入した写真のIDを返す
  } catch (error) {
    console.error("Error in addOrUpdatePhotoInDb:", error.message);
    throw error;
  }
};

// `list_items` テーブルに新しいスポットを追加する関数
const addSpotToList = async (spot: any, userId: string, listid: number) => {
  try {
    // list_id と place_id がすでに存在するかチェック
    const { data, error } = await supabase
      .from("list_items")
      .select("item_id")
      .eq("list_id", listid)
      .eq("place_id", spot.place_id)
      .maybeSingle();

    if (error) {
      console.error("Error checking list_items table:", error.message);
      throw new Error("Error checking list_items table");
    }

    if (data) {
      console.log("Spot already exists in the list, skipping insertion");
      // すでに同じlist_idとplace_idの組み合わせがあったらエラーを返す
      throw new Error(`"${spot.store_name}" はすでにリストに追加されています`);
    }

    // 写真をphotosテーブルに追加または更新してphoto_idを取得
    const photoIds = await Promise.all(
      spot.photo_ids.map((photoUrl: string) =>
        addOrUpdatePhotoInDb(photoUrl, spot.place_id)
      )
    );

    // list_itemsにデータを追加
    const { data: insertedData, error: insertError } = await supabase
      .from("list_items")
      .insert([
        {
          list_id: listid,
          store_name: spot.store_name,
          station: spot.station,
          google_rating: spot.google_rating,
          address: spot.address,
          prefecture: spot.prefecture,
          city: spot.city,
          category: spot.category,
          sub_category: spot.sub_category,
          place_id: spot.place_id,
          add_by_id: userId,
          created_at: convertToJST(new Date()),
          updated_at: convertToJST(new Date()),
          business_hours: spot.business_hours,
          regular_holiday: spot.regular_holiday,
          time_from_nearest_station: spot.time_from_nearest_station,
        },
      ])
      .select();

    if (insertError) {
      console.error("Error inserting spot:", insertError.message);
      throw new Error("Error inserting spot");
    }

    return insertedData[0]; // 追加したスポット情報を返す
  } catch (error) {
    console.error("Error in addSpotToList:", error.message);
    throw error; // エラーをそのまま投げる
  }
};

// 主な処理
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { spot, listid } = body;

    // セッションからuserIdを取得
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      throw new Error("ユーザーが認証されていません");
    }

    const userId = session.user.id;

    // list_itemsにデータを追加
    const spotData = await addSpotToList(spot, userId, listid);

    return NextResponse.json(
      { message: `"${spot.store_name}" を追加しました` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in addSpot API route:", error.message);
    return NextResponse.json(
      { message: "追加に失敗しました", error: error.message },
      { status: 500 }
    );
  }
};
