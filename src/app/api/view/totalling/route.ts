import { supabase } from '@/lib/supabase'; 
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { listId } = await req.json();

  if (!listId) {
    return NextResponse.json(
      { error: 'listId が不足しています' },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from('lists')
    .update({ is_aggregation_completed: true })
    .eq('list_id', listId);

  if (error) {
    console.error('❌ 集計完了フラグの更新に失敗:', error);
    return NextResponse.json(
      { error: '集計完了フラグの更新に失敗しました' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: '集計が完了しました' });
}