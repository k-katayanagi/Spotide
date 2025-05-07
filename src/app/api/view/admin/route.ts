import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { url, userId } = await req.json();

  if (!url || !userId) {
    return NextResponse.json(
      { error: 'url または userId が不足しています' },
      { status: 400 },
    );
  }

  const { data: listBasic, error: listError } = await supabase
    .from('lists')
    .select('list_id')
    .eq('url', url)
    .single();

  console.log('listBasic:', listBasic);
  if (listError || !listBasic) {
    console.error('listBasic取得失敗', { url, listError, listBasic });
    return NextResponse.json(
      { error: 'リストの取得に失敗しました' },
      { status: 500 },
    );
  }
  const listId = listBasic.list_id;

  const { data: vote, error: voteError } = await supabase
    .from('list_participants')
    .select('is_vote')
    .eq('list_id', listId);

  if (voteError) {
    console.error('participantsError details:', voteError);
    return NextResponse.json(
      { error: '投票情報の取得に失敗しました' },
      { status: 500 },
    );
  }

  const allVoted = vote.every((p) => p.is_vote === true);

  if (allVoted) {
    const { error: updateError } = await supabase
      .from('lists')
      .update({ is_voting_completed: true })
      .eq('list_id', listId);

    if (updateError) {
      console.error('voteUpdataError details:', updateError);
      return NextResponse.json(
        { error: '投票完了ステータスの更新に失敗しました' },
        { status: 500 },
      );
    }
  }

  const { data: list, error: finalListError } = await supabase
    .from('lists')
    .select('*')
    .eq('url', url)
    .single();

  if (finalListError || !list) {
    console.error('最新データ取得 details:', finalListError);
    return NextResponse.json(
      { error: '最新のリストの取得に失敗しました' },
      { status: 500 },
    );
  }

  // user_id + list_id で participant を特定
  const { data: participantId, error: participantIdError } = await supabase
    .from('list_participants')
    .select('*')
    .eq('user_id', userId)
    .eq('list_id', listId)
    .single();

  if (participantIdError || !participantId) {
    console.error('参加者ID取得失敗', { userId, listId, participantIdError });
    return NextResponse.json(
      { error: '参加者IDの取得に失敗しました' },
      { status: 403 },
    );
  }

  // list_items の取得
  const { data: items, error: itemsError } = await supabase
    .from('list_items')
    .select(
      `
    *,
    list_participants:participant_id (participant_name),
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

  const participantIdValue = participantId?.participant_id;
  const { data: participant, error: participantError } = await supabase
    .from('list_participants')
    .select('*')
    .eq('participant_id', participantIdValue)
    .single();

  if (participantError || !participant) {
    console.error('参加者情報の取得に失敗しました', {
      participantError,
      participant,
    });
    return NextResponse.json(
      { error: '参加者情報の取得に失敗しました' },
      { status: 500 },
    );
  }

  return NextResponse.json({ list, items, participant });
}
