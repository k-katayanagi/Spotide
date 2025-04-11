import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const urlParams = new URL(req.url).searchParams;
  const url = urlParams.get('url');
  const participantId = urlParams.get('participantId');

  if (!url || !participantId) {
    return NextResponse.json(
      { error: 'url または participantId が不足しています' },
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

  const { data: participants, error: participantsError } = await supabase
    .from('list_participants')
    .select('is_vote')
    .eq('list_id', listId);

  if (participantsError) {
    console.error('participantsError details:', participantsError);
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

  const { data: participant, error: participantError } = await supabase
    .from('list_participants')
    .select('*')
    .eq('participant_id', participantId)
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

//投票処理
export async function POST(req: Request) {
  const { participantId, listItemId } = await req.json(); // リクエストボディから参加者IDと投票アイテムIDを取得

  if (!participantId || !listItemId) {
    return NextResponse.json(
      { error: 'participantId または listItemId が不足しています' },
      { status: 400 },
    );
  }

  const { data: itemData, error: itemError } = await supabase
    .from('list_items')
    .select('vote_cnt')
    .eq('item_id', listItemId)
    .single(); // 単一のデータを取得

  if (itemError || !itemData) {
    return NextResponse.json(
      { error: 'リストアイテムの取得に失敗しました' },
      { status: 500 },
    );
  }

  const newVoteCount = itemData.vote_cnt + 1;

  const { error: updateItemError } = await supabase
    .from('list_items')
    .update({ vote_cnt: newVoteCount })
    .eq('item_id', listItemId);

  if (updateItemError) {
    return NextResponse.json(
      { error: 'リストアイテムの更新に失敗しました' },
      { status: 500 },
    );
  }

  const { error: updateVoteError } = await supabase
    .from('list_participants')
    .update({ is_vote: true, item_id: listItemId })
    .eq('participant_id', participantId);

  if (updateVoteError) {
    console.error('list_participants更新エラー:', updateVoteError);
    return NextResponse.json(
      { error: '参加者の投票状態更新に失敗しました' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: '投票が正常に完了しました' });
}
