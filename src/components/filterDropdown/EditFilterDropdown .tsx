"use client";
import { useState } from "react";
import ListSelect from "../ListSelect";
import {
  prefectures,
  cityOptions,
  stationOptions,
  categories,
  subCategories,
  regularHolidays,
  hours,
} from "@/consts/OptionList";
import OkButton from "../buttons/OkButton";
import StarRating from "../UI/StarRating";
// import { useListContext } from "@/contexts/ListContext";
import InputBox from "../InputBox";
// import { ListItem } from "@/types/ListTypes";

type Props = {
  toggleFilterDropdown: () => void;
};

const EditFilterDropdown = ({ toggleFilterDropdown }: Props) => {
  // const { listItems, setSortLists } = useListContext();
  // const [listItemsName, setListItemsName] = useState("");
  const [googleRating, setGoogleRating] = useState<number>(0);
  const [customRating, setCustomRating] = useState<number>(0);

  const addAllOption = (options: { value: string; label: string }[]) => [
    { value: "", label: "すべて" },
    ...options,
  ];
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleFilterApply = (e: React.FormEvent) => {
    e.preventDefault();
    toggleFilterDropdown();
  };

  return (
    <div
      className="bg-gradient-to-b from-[rgba(255,224,178,0.98)] to-[rgba(255,183,77,0.98)] border-4 border-[#FF9800] rounded-lg p-6 shadow-md 
            min-h-[50vh] max-h-[80vh] lg:min-h-[30vh] lg:max-h-[70vh] 
            flex flex-col items-center mx-auto relative"
    >
      <form onSubmit={handleFilterApply} className="flex flex-col flex-grow">
        <div className="m-auto">
          <div className="flex flex-col gap-4">
            {/* 検索ボックス */}
            <div className="flex justify-center w-fit">
              <InputBox
                placeholder="検索するキーワードを入力"
                // onChange={setListName}
                className="border border-black rounded-md text-lg w-[180px] sm:w-[300px] md:w-[380px] h-[40px]"
              />
            </div>

            {/* 都道府県・市区町村・駅 */}
            <div className="flex justify-center gap-2 w-fit">
              <ListSelect
                title="都道府県"
                options={addAllOption(prefectures)}
                onSelect={setSelectedStatus}
                className="w-[120px] h-[40px]"
              />
              {selectedStatus}
              <ListSelect
                title="市区"
                options={addAllOption(cityOptions)}
                onSelect={setSelectedStatus}
                className="w-[120px] h-[40px]"
              />
              <ListSelect
                title="駅"
                options={addAllOption(stationOptions)}
                onSelect={setSelectedStatus}
                className="w-[120px] h-[40px]"
              />
            
            </div>

            {/* カテゴリ・サブカテゴリ */}
            <div className="flex justify-center gap-2 w-fit">
              <ListSelect
                title="カテゴリ"
                options={addAllOption(categories)}
                onSelect={setSelectedStatus}
                className="w-[160px] h-[40px]"
              />
              <ListSelect
                title="サブカテゴリ"
                options={addAllOption(subCategories)}
                onSelect={setSelectedStatus}
                className="w-[160px] h-[40px]"
              />
            </div>

            {/* 営業時間 */}
            <div className="flex justify-center gap-2 w-fit">
              <ListSelect
                title="営業時間"
                options={addAllOption(hours)}
                onSelect={setSelectedStatus}
                className="w-[120px] h-[40px]"
              />
              <span className="flex justify-center lg:justify-end items-end mb-5">
                ～
              </span>
              <div className="flex flex-col justify-end items-end w-full">
                <ListSelect
                  options={addAllOption(hours)}
                  onSelect={setSelectedStatus}
                  className="w-[120px] h-[40px]"
                />
              </div>
            </div>

            {/* 定休日 */}
            <div className="flex justify-center w-fit">
              <ListSelect
                title="定休日"
                options={addAllOption(regularHolidays)}
                onSelect={setSelectedStatus}
                className="w-[160px] h-[40px]"
              />
            </div>

            <div className="flex justify-between items-end w-full">
              {/* Google評価 */}
              <div className="flex flex-col items-start">
                <span>Google評価</span>
                <StarRating
                  count={5}
                  value={googleRating}
                  onChange={setGoogleRating}
                />
              </div>

              {/* カスタム評価 */}
              <div className="flex flex-col items-start">
                <span>カスタム評価</span>
                <StarRating
                  count={5}
                  value={customRating}
                  onChange={setCustomRating}
                />
              </div>
            </div>

            <div className="flex justify-end w-full">
              <OkButton />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditFilterDropdown;
