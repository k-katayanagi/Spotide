import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Supabaseクライアントのインポート（適宜パスを変更）

export async function POST(request: NextRequest) {
  try {
    const { participantId, participantName } = await request.json();

    // list_participants テーブルで participantId を基にユーザー名を更新
    const { data, error } = await supabase
      .from('list_participants')
      .update({ participant_name: participantName })
      .eq('participant_id', participantId);

    if (error) {
      throw error;
    }

    if (data) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error('ユーザー名の更新エラー:', error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
