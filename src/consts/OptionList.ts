import { TListType } from "@/types/OptionTypes";

export const listTypeOptions: TListType[] = [
  { value: "individual", label: "個人リスト" },
  { value: "share", label: "共有リスト" },
];



export const listStatusOptions = [
  { value: 0, label: "未完了" },
  { value: 1, label: "進行中" },
  { value: 2, label: "完了" }
];
