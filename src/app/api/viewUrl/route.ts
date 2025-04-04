import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const listId = searchParams.get('listId');

  if (!listId) {
    return NextResponse.json({ error: 'listId が必要です' }, { status: 400 });
  }

  try {
    // `url` を取得するだけ（null の場合、新規発行しない）
    const { data, error } = await supabase
      .from('lists')
      .select('url')
      .eq('list_id', listId)
      .single();

    if (error) throw error;

    return NextResponse.json({ viewUrl: data?.url || null });
  } catch (error) {
    console.error('APIエラー:', error);
    return NextResponse.json(
      { error: 'データの取得に失敗しました' },
      { status: 500 },
    );
  }
}


export async function POST(req: Request) {
  const { listId } = await req.json();

  if (!listId) {
    return NextResponse.json({ error: 'listId が必要です' }, { status: 400 });
  }

  try {
    // 新しい UUID を発行
    const newUuid = crypto.randomUUID();

    // `lists` テーブルの `url` カラムを更新
    const { error: updateError } = await supabase
      .from('lists')
      .update({ url: newUuid })
      .eq('list_id', listId);

    if (updateError) throw updateError;

    return NextResponse.json({ viewUrl: `/view/${newUuid}` });
  } catch (error) {
    console.error('APIエラー:', error);
    return NextResponse.json(
      { error: 'UUIDの発行に失敗しました' },
      { status: 500 },
    );
  }
}
