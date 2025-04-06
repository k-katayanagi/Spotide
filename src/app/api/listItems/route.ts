import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/authOptions';
import { Spot } from '@/types/ListTypes';

// 日本時間に変換する関数（Dateオブジェクトを作成）
const convertToJST = (date: string | Date): string => {
  const dateObj = new Date(date);
  const offset = 9 * 60;
  dateObj.setMinutes(dateObj.getMinutes() + offset);
  return dateObj.toISOString();
};

// list_itemsテーブルで重複をチェックする関数
const checkExistingSpot = async (
  listid: number,
  storeName: string,
  address: string,
) => {
  try {
    const { data, error } = await supabase
      .from('list_items')
      .select('item_id')
      .eq('list_id', listid)
      .eq('store_name', storeName)
      .eq('address', address)
      .maybeSingle(); // 存在しない場合でもエラーをスローせず、null を返す
    if (error) {
      console.error('Error checking existing spot:', error.message);
      throw new Error('Error checking existing spot');
    }
    return data; // 存在する場合はスポットのデータを返す
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      throw error; // 必要に応じてエラーを再スロー
    } else {
      console.error('Unknown error:', error);
      throw new Error('Unknown error occurred');
    }
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { spot, listid } = body;
    const photoUrls = spot.photo_ids || [];

    // セッションからuserIdを取得
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      throw new Error('ユーザーが認証されていません');
    }

    const userId = session.user.id;

    // list_itemsテーブルで重複チェック
    const existingSpot = await checkExistingSpot(
      listid,
      spot.store_name,
      spot.address,
    );

    // もし既にリストに追加されている場合
    if (existingSpot && existingSpot.item_id) {
      return NextResponse.json(
        { message: `"${spot.store_name}" はすでにリストに追加されています` },
        { status: 400 },
      );
    }

    // 写真をphotosテーブルに追加
    const photoIdPromises = photoUrls.map(
      (photoUrl: string) => addPhotoToDb(photoUrl, null), // 最初はitem_idをnullとして挿入
    );
    const photoIds = await Promise.all(photoIdPromises);

    // list_itemsにデータを追加
    const spotData = await addSpotToList(spot, photoIds, userId, listid); // photoIdsを渡す

    // 写真のitem_idを更新
    if (spotData) {
      await updatePhotoItemIds(photoIds, spotData.item_id); // item_idを更新
    } else {
      throw new Error('Spot ID is undefined');
    }

    return NextResponse.json(
      { message: `"${spot.store_name}" を追加しました` },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Error型の場合のみmessageを使用
      console.error('Error in addSpot API route:', error.message);
      return NextResponse.json(
        { message: '追加に失敗しました', error: error.message },
        { status: 500 },
      );
    } else {
      // Error型ではない場合の処理
      console.error('Unknown error:', error);
      return NextResponse.json(
        { message: '追加に失敗しました', error: 'Unknown error occurred' },
        { status: 500 },
      );
    }
  }
};

// photosテーブルに画像URLを挿入する関数
const addPhotoToDb = async (photoUrl: string, itemId: number | null) => {
  try {
    if (!photoUrl) {
      throw new Error('photoUrl is required');
    }
    console.log('Inserting photo with URL:', photoUrl, 'and itemId:', itemId);

    const { data, error } = await supabase
      .from('photos')
      .insert([
        {
          item_id: itemId, // 最初はnull
          photo_url: photoUrl,
        },
      ])
      .select();
    if (error) {
      throw new Error('Error inserting photo: ' + error.message);
    }
    return data[0].photos_id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // errorがError型の場合
      console.error('Error adding photo:', error.message);
      throw error;
    } else {
      // errorがError型でない場合
      console.error('Unknown error adding photo:', error);
      throw new Error('Unknown error occurred while adding photo.');
    }
  }
};

// list_itemsテーブルにスポット情報を追加する関数
const addSpotToList = async (
  spot: Spot,
  photoIds: number[], // 配列でphotoIdsを受け取る
  userId: string,
  listid: number,
) => {
  try {
    // list_participants から participant_id を取得
    const { data: participantData, error: participantError } = await supabase
      .from('list_participants')
      .select('participant_id')
      .eq('list_id', listid)
      .eq('user_id', userId)
      .single(); // 単一の値を取得

    if (participantError || !participantData) {
      console.error(
        'Error fetching participant_id:',
        participantError?.message,
      );
      throw new Error('参加者情報を取得できませんでした');
    }

    const participantId = participantData.participant_id;

    // list_items にスポットを追加
    const { data, error } = await supabase
      .from('list_items')
      .insert([
        {
          list_id: listid,
          participant_id: participantId, // 取得した participant_id をセット
          store_name: spot.store_name,
          station: spot.station,
          google_rating: spot.google_rating,
          address: spot.address,
          prefecture: spot.prefecture,
          city: spot.city,
          category: spot.category,
          sub_category: spot.sub_category,
          photo_id: JSON.stringify(photoIds), // photoIdsをJSON文字列に変換して格納
          business_hours: spot.business_hours,
          regular_holiday: spot.regular_holiday,
          time_from_nearest_station: spot.time_from_nearest_station,
          add_by_id: userId,
          created_at: convertToJST(new Date()),
          updated_at: convertToJST(new Date()),
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting spot:', error.message);
      throw new Error('Error inserting spot: ' + error.message);
    }

    return data[0]; // 追加したスポット情報を返す
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding photo:', error.message);
      throw error;
    } else {
      console.error('Unknown error adding photo:', error);
      throw new Error('Unknown error occurred while adding photo.');
    }
  }
};

// photosテーブルのitem_idを更新する関数
const updatePhotoItemIds = async (photoIds: number[], itemId: number) => {
  try {
    if (photoIds.length === 0) {
      console.log('No photos to update.');
      return;
    }

    const validPhotoIds = photoIds.map((id) => parseInt(id.toString(), 10));

    const { error } = await supabase
      .from('photos')
      .update({ item_id: itemId }) // photos テーブルの item_id を更新
      .in('photos_id', validPhotoIds); // photos_id が一致するものに対して item_id を更新

    if (error) {
      throw new Error('Error updating photo item_id: ' + error.message);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating photo:', error.message);
      throw error;
    } else {
      console.error('Unknown error updating photo:', error);
      throw new Error('Unknown error occurred while adding photo.');
    }
  }
};

//listItem取得処理
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const listId = searchParams.get('list_id');

    if (!listId) {
      return NextResponse.json(
        { message: 'list_id is required' },
        { status: 400 },
      );
    }

    const { data: listItems, error } = await supabase
      .from('list_items')
      .select(
        `
      *,
      list_participants!list_participants_item_id_fkey (participant_name), 
      photos (photo_url)
    `,
      )
      .eq('list_id', listId);

    if (error) {
      console.error('Error fetching list items:', error.message);
    }
    return NextResponse.json({ listItems }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in GET list_items and lists API:', error.message);
      return NextResponse.json(
        { message: 'Failed to fetch data', error: error.message },
        { status: 500 },
      );
    } else {
      console.error('Unknown error in GET request:', error);
      return NextResponse.json(
        { message: 'Failed to fetch data', error: 'Unknown error occurred' },
        { status: 500 },
      );
    }
  }
};

//削除処理
export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { item_id } = body;

    if (!item_id) {
      return NextResponse.json(
        { message: 'item_id is required' },
        { status: 400 },
      );
    }

    // list_itemsテーブルからアイテムを削除
    const { error: listItemsError } = await supabase
      .from('list_items')
      .delete()
      .eq('item_id', item_id);

    if (listItemsError) {
      console.error('Error deleting list item:', listItemsError.message);
      throw new Error('Error deleting list item');
    }

    // photosテーブルから関連する写真を削除
    const { error: photosError } = await supabase
      .from('photos')
      .delete()
      .eq('item_id', item_id);

    if (photosError) {
      console.error('Error deleting photos:', photosError.message);
      throw new Error('Error deleting photos');
    }

    // 削除が成功した場合
    return NextResponse.json(
      { message: 'スポットと関連する写真を削除しました' },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in DELETE list item and photos:', error.message);
      return NextResponse.json(
        { message: '削除に失敗しました', error: error.message },
        { status: 500 },
      );
    } else {
      console.error('Unknown error in DELETE request:', error);
      return NextResponse.json(
        { message: '削除に失敗しました', error: 'Unknown error occurred' },
        { status: 500 },
      );
    }
  }
};
