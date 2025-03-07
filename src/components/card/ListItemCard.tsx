"use client";

// import { useState } from "react";
import DeleteButton from "@/components/buttons/DeleteButton";
import { ListItem } from "@/types/ListTypes";
import Image from "next/image";

const defaultFields = [
  { key: "station", label: "駅" },
  { key: "google_rating", label: "Google評価" },
  { key: "custom_rating", label: "カスタム評価" },
  { key: "address", label: "住所" },
  { key: "prefecture", label: "都道府県" },
  { key: "city", label: "市区町村" },
  { key: "time_to_station", label: "駅からの所要時間" },
  { key: "business_hours", label: "営業時間" },
  { key: "regular_holiday", label: "定休日" },
  { key: "category", label: "カテゴリ" },
  { key: "sub_category", label: "サブカテゴリ" },
  { key: "add_by_id", label: "登録者" },
  { key: "created_at", label: "登録日" },
];

interface Props {
  listItem: ListItem;
  onDelete?: () => void;
  onEdit?: () => void;
}

const ListItemCard = ({ listItem, onDelete}: Props) => {
  // const [selectedFields, setSelectedFields] = useState(defaultFields);


  return (
    <div className="bg-white border border-orange-300 shadow-md rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between">
      <div className="flex justify-center items-center mb-4 space-x-2 sm:space-x-6 md:space-x-10 lg:space-x-16 xl:space-x-20">
        <DeleteButton className="mx-2" onClick={onDelete} />
      </div>
      <div className="flex-1">
        <Image
          src="/images/image.gif"
          alt="画像"
          width={0} // 自動調整のため0に設定
          height={160}
          className="w-full h-[160px] object-cover rounded-lg mb-4"
          unoptimized
        />
        <h2 className="text-lg font-bold">{listItem.store_name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {defaultFields.map((field) => (
            <div key={field.key} className="flex text-base">
              <span className="font-bold text-lg text-gray-900">
                {field.label}:
              </span>
              &nbsp;
              <span className="text-gray-700">
                {field.key === "created_at"
                  ? new Date(listItem.created_at).toLocaleDateString()
                  : String(listItem[field.key as keyof ListItem])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListItemCard;
