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
     list_participants!list_participants_item_id_fkey (participant_name), 
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

//投票処理
export async function POST(req: Request) {
  const { participantId, listItemId } = await req.json(); // リクエストボディから参加者IDと投票アイテムIDを取得

  if (!participantId || !listItemId) {
    return NextResponse.json(
      { error: 'participantId または listItemId が不足しています' },
      { status: 400 },
    );
  }

  // 投票を行ったアイテムの vote_cnt を1増加
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

  // vote_cnt をインクリメント
  const newVoteCount = itemData.vote_cnt + 1;

  // list_items テーブルの vote_cnt を更新
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

  // list_participants テーブルの is_vote を true に更新
  const { error: updateVoteError } = await supabase
    .from('list_participants')
    .update({ is_vote: true, item_id: listItemId }) 
    .eq('participant_id', participantId); // participant_id を指定

  if (updateVoteError) {
    console.error('list_participants更新エラー:', updateVoteError);
    return NextResponse.json(
      { error: '参加者の投票状態更新に失敗しました' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: '投票が正常に完了しました' });
}
