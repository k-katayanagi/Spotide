export type TUsers = {
  user_id: string;
  google_id: string;
  user_name: string;
  created_at: Date; // 登録日
  updated_at: Date; // 更新日
};

export type TParticipantingUser = {
  participant_id: number; // 参加ID（一意）
  list_id: number | null; // リストID（どのリストに属するか）
  user_id: string; // 参加者ID（ユーザーを識別）
  participant_name: string; // 参加者名
  password: string; // 参加用パスワード（ハッシュ化前提）
  is_guest: boolean; // ゲストかどうか（true = ゲスト, false = ユーザー）
  created_at: Date; // 登録日
  updated_at: Date; // 更新日
  is_admin: boolean;
  is_vote: boolean;
  item_id?: number | null;
};
