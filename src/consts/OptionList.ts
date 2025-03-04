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
  { value: 0, label: "投票開始日時" },
  { value: 1, label: "ステータス" },
  { value: 2, label: "最終更新者" },
  { value: 2, label: "おでかけ日" },
  { value: 3, label: "作成日時" },
  { value: 4, label: "更新日時" },
];

export const Sort = [
  { value: 0, label: "昇順" },
  { value: 1, label: "降順" },
];
