export type TParticipantingUser = {
  participant_id: number; // 参加ID（ユニーク）
  list_id: number; // リストID（どのリストに属するか）
  user_id: number; // 参加者ID（ユーザーを識別）
  participant_name: string; // 参加者名
  password: string; // 参加用パスワード（ハッシュ化前提）
  is_guest: boolean; // ゲストかどうか（true = ゲスト, false = ユーザー）
  created_at: Date; // 登録日
  updated_at: Date; // 更新日
};
