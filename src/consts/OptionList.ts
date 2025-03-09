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

export const listItemInfo = [
  { value: "store_name", label: "店舗名" },
  { value: "google_rating", label: "Google評価" },
  { value: "custom_rating", label: "カスタム評価" },
  { value: "time_to_station", label: "最寄駅までの時間（分）" },
  { value: "business_start_hours", label: "営業開始時間" },
  { value: "business_end_hours", label: "営業終了時間" },
  { value: "created_at", label: "作成日時" },
  { value: "updated_at", label: "更新日時" }
];


export const Sort = [
  { value: 0, label: "昇順" },
  { value: 1, label: "降順" },
];

export const prefectures = [
  { value: "hokkaido", label: "北海道" },
  { value: "tokyo", label: "東京都" },
  { value: "osaka", label: "大阪府" },
  { value: "fukuoka", label: "福岡県" },
];


export const categories = [
  { value: "restaurant", label: "レストラン" },
  { value: "cafe", label: "カフェ" },
  { value: "bar", label: "バー" }
];

export const subCategories = [
  { value: "washoku", label: "和食" },
  { value: "yoshoku", label: "洋食" },
  { value: "chuka", label: "中華" }
];

export const regularHolidays = [
  { value: "none", label: "なし" },
  { value: "monday", label: "月曜日" },
  { value: "tuesday", label: "火曜日" },
  { value: "wednesday", label: "水曜日" },
  { value: "thursday", label: "木曜日" },
  { value: "friday", label: "金曜日" },
  { value: "saturday", label: "土曜日" },
  { value: "sunday", label: "日曜日" }
];

export const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString().padStart(2, "0"), 
  label: `${i}時`
}));

export const cityOptions = [
    { value: "sapporo", label: "札幌市" },
    { value: "hakodate", label: "函館市" },
    { value: "shinjuku", label: "新宿区" },
    { value: "shibuya", label: "渋谷区" },
    { value: "osaka-shi", label: "大阪市" },
    { value: "sakai-shi", label: "堺市" },
    { value: "fukuoka-shi", label: "福岡市" },
    { value: "kitakyushu", label: "北九州市" },
  ]


export const stationOptions = [
    { value: "sapporo-station", label: "札幌駅" },
    { value: "odori", label: "大通駅" },
    { value: "shinjuku-station", label: "新宿駅" },
    { value: "takadanobaba", label: "高田馬場駅" },
    { value: "osaka-station", label: "大阪駅" },
    { value: "namba", label: "難波駅" },
    { value: "hakata", label: "博多駅" },
    { value: "tenjin", label: "天神駅" },
  ]
