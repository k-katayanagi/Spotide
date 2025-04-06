"use client";
import { useState } from "react";
import ListSelect from "../ListSelect";
import {
  prefectures,
  cityOptions,
  stationOptions,
  categories,
  subCategories,
  hours,
} from "@/consts/OptionList";
import SearchButton from "../buttons/SearchButton";
import StarRating from "../UI/StarRating";
// import { useListContext } from "@/contexts/ListContext";
// import { ListItem } from "@/types/ListTypes";

type Props = {
  toggleFilterDropdown: () => void;
};

const SpotSearchFilterDropdown = ({ toggleFilterDropdown }: Props) => {
  // const { listItems, setSortLists } = useListContext();
  // const [listItemsName, setListItemsName] = useState("");
  const [googleRating, setGoogleRating] = useState<number>(0);
  const [selectedHolidays, setSelectedHolidays] = useState<string[]>([]);
  // const [selectedTimeToStation, setSelectedTimeToStation] =
  //   useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const addAllOption = (options: { value: string; label: string }[]) => [
    { value: "", label: "すべて" },
    ...options,
  ];
  const daysOfWeek = [
    { value: "monday", label: "月" },
    { value: "tuesday", label: "火" },
    { value: "wednesday", label: "水" },
    { value: "thursday", label: "木" },
    { value: "friday", label: "金" },
    { value: "saturday", label: "土" },
    { value: "sunday", label: "日" },
  ];
  const handleHolidayChange = (holiday: string) => {
    setSelectedHolidays((prev) =>
      prev.includes(holiday)
        ? prev.filter((h) => h !== holiday)
        : [...prev, holiday]
    );
  };

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

            {/* 都道府県・市区町村・駅 */}
            <div className="flex justify-center gap-2 w-fit">
              <ListSelect
                title="都道府県"
                options={addAllOption(prefectures)}
                onSelect={setSelectedStatus}
                className="w-[100px] sm:w-[120px] h-[20px] sm:h-[30px]"
              />
              {selectedStatus}
              <ListSelect
                title="市区"
                options={addAllOption(cityOptions)}
                onSelect={setSelectedStatus}
                className="w-[100px] sm:w-[120px] h-[20px] sm:h-[30px]"
              />
              <ListSelect
                title="最寄駅"
                options={addAllOption(stationOptions)}
                onSelect={setSelectedStatus}
                className="w-[100px] sm:w-[120px] h-[20px] sm:h-[30px]"
              />
            </div>

            {/* カテゴリ・サブカテゴリ */}
            <div className="flex justify-center gap-2 w-fit">
              <ListSelect
                title="カテゴリ"
                options={addAllOption(categories)}
                onSelect={setSelectedStatus}
                className="w-[140px] sm:w-[160px] h-[20px] sm:h-[30px]"
              />
              <ListSelect
                title="サブカテゴリ"
                options={addAllOption(subCategories)}
                onSelect={setSelectedStatus}
                className="w-[140px] sm:w-[160px] h-[20px] sm:h-[30px]"
              />
            </div>

            {/* 営業時間 */}
            <div className="flex justify-center gap-2 w-fit">
              <ListSelect
                title="営業時間"
                options={addAllOption(hours)}
                onSelect={setSelectedStatus}
                className="w-[100px] sm:w-[120px] h-[20px] sm:h-[30px]"
              />
              <span className="flex justify-center lg:justify-end items-end mb-5">
                ～
              </span>
              <div className="flex flex-col justify-end items-end w-full">
                <ListSelect
                  options={addAllOption(hours)}
                  onSelect={setSelectedStatus}
                  className="w-[100px] sm:w-[120px] h-[20px] sm:h-[30px]"
                />
              </div>
            </div>

            {/* 定休日 */}
            <div className="flex justify-center w-fit">
              <div className="flex flex-col">
                <span className="mb-2">定休日</span>
                <div className="grid grid-cols-7 gap-2">
                  {daysOfWeek.map((day) => (
                    <label key={day.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={day.value}
                        checked={selectedHolidays.includes(day.value)}
                        onChange={() => handleHolidayChange(day.value)}
                      />
                      {day.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 所要時間 */}
            <div className="flex justify-center gap-2 w-fit">
              <div className="flex flex-col justify-center">
                <span>最寄駅からの所要時間</span>
                <ListSelect
                  options={[
                    { value: "10", label: "10分" },
                    { value: "20", label: "20分" },
                    { value: "30", label: "30分" },
                  ]}
                  onSelect={setSelectedStatus}
                  className="w-[100px] sm:w-[120px] h-[20px] sm:h-[30px]"
                />
              </div>

              {/* コメントアウトした部分 */}
              {/* <div className="flex items-end gap-2">
              <span className="flex justify-center  items-end">
                ～ 
              </span>
              <div className="flex flex-col justify-end items-end w-full">
                <ListSelect
                  options={[
                    { value: "10", label: "10分" },
                    { value: "20", label: "20分" },
                    { value: "30", label: "30分" },
                  ]}
                  onSelect={setSelectedTimeToStation}
                  className="w-[120px] h-[40px]"
                />
              </div>
            </div> */}
            </div>

            <div className="flex justify-between items-start w-full flex-wrap">
              <div className="flex flex-col items-start mr-4">
                <span>Google評価</span>
                <StarRating
                  count={5}
                  value={googleRating}
                  onChange={setGoogleRating}
                />
              </div>
          
              {/* OKボタン */}
              <div　className="flex items-end ml-auto w-full justify-end">
                <SearchButton />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SpotSearchFilterDropdown;
