"use client";

import { Spot } from "@/types/ListTypes";
import AddButton from "../buttons/AddButton";
import Image from "next/image";

const defaultFields = [
  { key: "station", label: "駅" },
  { key: "google_rating", label: "Google評価" },
  { key: "custom_rating", label: "カスタム評価" },
  { key: "address", label: "住所" },
  { key: "time_to_station", label: "駅からの所要時間" },
  { key: "business_hours", label: "営業時間" },
  { key: "regular_holiday", label: "定休日" },
  { key: "time_from_nearest_station", label: "最寄り駅からの時間" },
  { key: "category", label: "カテゴリ" },
  { key: "sub_category", label: "サブカテゴリ" },
  { key: "add_by_id", label: "登録者" },
  { key: "created_at", label: "登録日" },
];

interface Props {
  SearchSpot: Spot;
  onAdd?: () => void;
}

const SearchSpotCard = ({ SearchSpot }: Props) => {
  return (
    <div className="bg-white border border-orange-300 shadow-md rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between">
      <div className="flex justify-center items-center mb-4 space-x-2 sm:space-x-6 md:space-x-10 lg:space-x-16 xl:space-x-20">
        <AddButton/>
      </div>
      <div className="flex-1">
        <Image
          src="/images/image.gif"
          alt="画像"
          width={300}
          height={160}
          className="w-full h-[160px] object-cover rounded-lg mb-4"
          unoptimized
        />
        <h2 className="text-lg font-bold">{SearchSpot.store_name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {defaultFields.map((field) => (
            <div key={field.key} className="flex text-base">
              <span className="font-bold text-lg text-gray-900">
                {field.label}:
              </span>
              &nbsp;
              <span className="text-gray-700">
                {field.key === "created_at"
                  ? new Date(SearchSpot.created_at).toLocaleDateString()
                  : String(SearchSpot[field.key as keyof Spot] || "―")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSpotCard;
