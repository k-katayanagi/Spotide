import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Supabaseクライアントのインポート（適宜パスを変更）

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    const { data, error } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return NextResponse.json({ isExisting: false });
    }

    return NextResponse.json({ isExisting: true });
  } catch (error) {
    console.error('既存ユーザー確認エラー:', error);
    return NextResponse.json({ isExisting: false }, { status: 400 });
  }
}
