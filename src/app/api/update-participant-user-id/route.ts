import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Supabaseクライアントのインポート（適宜パスを変更）

export async function POST(request: NextRequest) {
  try {
    const { participantId, userId, isGuest } = await request.json();

    // list_participants テーブルで participantId を基に user_id と is_guest を更新
    const { data, error } = await supabase
      .from('list_participants')
      .update({ user_id: userId, is_guest: isGuest })
      .eq('participant_id', participantId)
      .select();

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error('ユーザーIDの更新エラー:', error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
