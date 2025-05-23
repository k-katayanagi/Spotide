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
      console.log(listError);
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
      console.log(participantError);
      return NextResponse.json(
        { error: participantError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: listData,
    });
  } catch (error) {
    console.log(error);
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
      .from('list_participants')
      .select(
        `
      is_admin,
      lists:list_participants_list_id_fkey (*)
    `,
      )
      .eq('user_id', userId)
      .eq('lists.list_type', listType);

    if (listId) {
      const numericListId = Number(listId);
      if (!isNaN(numericListId)) {
        query = query.eq('list_id', numericListId);
      } else {
        return NextResponse.json({ error: '無効な list_id' }, { status: 400 });
      }
    }

    // 作成日順に並べ替え（降順）
    query = query.order('created_at', { ascending: false });
    const { data, error } = await query;

    if (error) {
      console.error('Supabaseエラー:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('リスト取得データ:', data);

    //取得データフォーマット
    const formatted = data
      .filter((item) => item.lists !== null)
      .map((item) => ({
        ...item.lists,
        is_admin: item.is_admin,
      }));
    return NextResponse.json(formatted);
  } catch (error: unknown) {
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

    const { data, error } = await supabase
      .from('lists')
      .delete()
      .eq('list_id', listId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

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
