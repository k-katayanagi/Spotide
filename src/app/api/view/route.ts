import { supabase } from '@/lib/supabase'; // パスはプロジェクトに合わせて
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // クエリパラメータから url と participantId を取得
  const urlParams = new URL(req.url).searchParams;
  const url = urlParams.get('url');
  const participantId = urlParams.get('participantId');

  if (!url || !participantId) {
    return NextResponse.json(
      { error: 'url または participantId が不足しています' },
      { status: 400 },
    );
  }

  // listの id を先に取得（is_voting_completed含まず）
  const { data: listBasic, error: listError } = await supabase
    .from('lists')
    .select('list_id')
    .eq('url', url)
    .single();

  if (listError || !listBasic) {
    console.error('❌ listBasic取得失敗', { url, listError, listBasic });
    return NextResponse.json(
      { error: 'リストの取得に失敗しました' },
      { status: 500 },
    );
  }

  const listId = listBasic.list_id;

  // list_participants の全体取得（投票完了チェック用）
  const { data: participants, error: participantsError } = await supabase
    .from('list_participants')
    .select('is_vote')
    .eq('list_id', listId);

  if (participantsError) {
    return NextResponse.json(
      { error: '参加者データの取得に失敗しました' },
      { status: 500 },
    );
  }

  const allVoted = participants.every((p) => p.is_vote === true);

  if (allVoted) {
    const { error: updateError } = await supabase
      .from('lists')
      .update({ is_voting_completed: true })
      .eq('list_id', listId);

    if (updateError) {
      return NextResponse.json(
        { error: '投票完了ステータスの更新に失敗しました' },
        { status: 500 },
      );
    }
  }

  // 最新の list を再取得
  const { data: list, error: finalListError } = await supabase
    .from('lists')
    .select('*')
    .eq('url', url)
    .single();

  if (finalListError || !list) {
    return NextResponse.json(
      { error: '最新のリストの取得に失敗しました' },
      { status: 500 },
    );
  }

  // list_items の取得
  const { data: items, error: itemsError } = await supabase
    .from('list_items')
    .select(
      `
    *,
    list_participants (participant_name),
    photos (photo_url)
  `,
    )
    .eq('list_id', listId);

  if (itemsError) {
    console.error('list_items取得失敗', { listId, itemsError });
    return NextResponse.json(
      { error: 'リストアイテムの取得に失敗しました' },
      { status: 500 },
    );
  }

  // 該当の list_participant の取得
  const { data: participant, error: participantError } = await supabase
    .from('list_participants')
    .select('*')
    .eq('participant_id', participantId)
    .single();

  if (participantError || !participant) {
    return NextResponse.json(
      { error: '参加者情報の取得に失敗しました' },
      { status: 500 },
    );
  }

  // 最終レスポンスに含める
  return NextResponse.json({ list, items, participant });
}
