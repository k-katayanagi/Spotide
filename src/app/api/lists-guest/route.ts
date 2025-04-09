import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';


// GET: リストを取得
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const listId = searchParams.get('listId');

  if (!listId) {
    return NextResponse.json(
      { error: 'IDが必要です' },
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
      .eq('list_id',listId)

    if (listId) {
      const numericListId = Number(listId);
      if (!isNaN(numericListId)) {
        query = query.eq('list_id', numericListId);
      } else {
        return NextResponse.json({ error: '無効な list_id' }, { status: 400 });
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabaseエラー:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('リスト取得データ:', data);

    //取得データフォーマット
    const formatted = data
      .filter((item) => item.lists !== null) // listsがnullのものを除外
      .map((item) => ({
        ...item.lists,
        is_admin: item.is_admin,
      }));
    return NextResponse.json(formatted); // 整形済みデータを返す
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

