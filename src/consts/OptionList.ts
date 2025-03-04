import { TListType } from "@/types/OptionTypes";

export const listTypeOptions: TListType[] = [
  { value: "individual", label: "個人リスト" },
  { value: "share", label: "共有リスト" },
];

export const listStatusOptions = [
  { value: 0, label: "未完了" },
  { value: 1, label: "進行中" },
  { value: 2, label: "完了" },
];

export const listInfo = [
  { value: "create_date", label: "作成日時" },
  { value: "update_date", label: "更新日時" },
  { value: "vote_start_date", label: "投票開始日時" },
  { value: "status", label: "ステータス" },
  { value: "lastUpdatedBy", label: "最終更新者" },
  { value: "outing_date", label: "おでかけ日" },
];

export const Sort = [
  { value: 0, label: "昇順" },
  { value: 1, label: "降順" },
];
