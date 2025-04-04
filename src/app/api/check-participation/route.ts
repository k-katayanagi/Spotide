import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { participantId, password, currentUserId } = await request.json();
  


    // 該当する participant を取得
    const { data, error } = await supabase
    .from('list_participants')
    .select('*')
    .eq('participant_id', participantId)
    .eq('password', password)
    .maybeSingle(); 

   
    if (error || !data) {
      console.error('参加者情報の取得に失敗:', error);
      return NextResponse.json({ isValid: false }, { status: 404 });
    }

    // パスワードが一致するか
    const isPasswordMatch = data.password === password;

    // すでに他の user_id が設定されていないか
    const isAlreadyClaimed = data.user_id && data.user_id !== currentUserId;

    if (isPasswordMatch && !isAlreadyClaimed) {
      return NextResponse.json({ isValid: true });
    }

    return NextResponse.json({ isValid: false });
  } catch (error) {
    console.error('認証エラー:', error);
    return NextResponse.json({ isValid: false }, { status: 500 });
  }
}
