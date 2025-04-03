import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 日本時間に変換する関数（Dateオブジェクトを作成）
const convertToJST = (date: string | Date): string => {
  const dateObj = new Date(date);
  const offset = 9 * 60;
  dateObj.setMinutes(dateObj.getMinutes() + offset);
  return dateObj.toISOString();
};

const generatePassword = (length: number = 12): string => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

// POST: リストを作成
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { listName, selectedType, voteDate, outingDate, userId, username } =
      body;

    // データ挿入 - listsテーブル
    const { data: listData, error: listError } = await supabase
      .from('lists')
      .insert([
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
      ])
      .select();

    if (listError) {
      console.log(listError); // エラーメッセージを表示
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    if (!listData || listData.length === 0) {
      return NextResponse.json(
        { error: 'リストの作成に失敗しました' },
        { status: 500 },
      );
    }

    const listId = listData[0].list_id;
    const password = generatePassword();

    const { error: participantError } = await supabase
      .from('list_participants')
      .insert([
        {
          list_id: listId,
          user_id: userId,
          participant_name: username,
          password: password,
          is_guest: false,
          is_admin: true,
          created_at: convertToJST(new Date()),
          updated_at: convertToJST(new Date()),
        },
      ]);

    if (participantError) {
      console.log(participantError); // エラーメッセージを表示
      return NextResponse.json(
        { error: participantError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: listData,
    });
  } catch (error) {
    console.log(error); // エラー内容を表示
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: '不明なエラーが発生しました' },
      { status: 500 },
    );
  }
}

// GET: リストを取得
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const listType = (searchParams.get('listType') || 'individual').replace(
    '_list',
    '',
  );
  const listId = searchParams.get('listId');

  if (!userId) {
    return NextResponse.json(
      { error: 'ユーザーIDが必要です' },
      { status: 400 },
    );
  }

  try {
    let query = supabase
      .from('lists')
      .select('*')
      .eq('creator_id', userId)
      .eq('list_type', listType);

    // listId がある場合にのみフィルタリング
    if (listId) {
      const numericListId = Number(listId);

      if (!isNaN(numericListId)) {
        query = query.eq('list_id', numericListId.toString());
      } else {
        console.error('エラー: list_id が数値ではありません:', listId);
        return NextResponse.json({ error: '無効な list_id' }, { status: 400 });
      }
    }

    // クエリの実行
    const { data, error } = await query;

    if (error) {
      console.error('Supabaseエラー:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('取得データ:', data);
    return NextResponse.json(data); // 取得したリストデータを返す
  } catch (error: unknown) {
    // errorをError型にキャスト
    if (error instanceof Error) {
      console.error('リスト取得中のエラー:', error);
      return NextResponse.json(
        { error: 'リスト取得中にエラーが発生しました', details: error.message },
        { status: 500 },
      );
    } else {
      console.error('不明なエラー:', error);
      return NextResponse.json(
        { error: '不明なエラーが発生しました' },
        { status: 500 },
      );
    }
  }
}

// DELETE: リストを削除
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { listId } = body;

    // リストの削除
    const { data, error } = await supabase
      .from('lists')
      .delete()
      .eq('list_id', listId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // list_participants テーブルから list_id に紐づくレコードを削除
    const { error: participantsError } = await supabase
      .from('list_participants')
      .delete()
      .eq('list_id', listId);

    if (participantsError) {
      return NextResponse.json(
        { error: participantsError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: 'List deleted successfully', data });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 },
    );
  }
}
