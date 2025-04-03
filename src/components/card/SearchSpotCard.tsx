'use client';

import { Spot } from '@/types/ListTypes';
import AddButton from '../buttons/AddButton';
import ImageSlider from '../UI/ImageSlider';

const defaultFields = [
  { key: 'google_rating', label: 'Google評価' },
  { key: 'address', label: '住所' },
  { key: 'business_hours', label: '営業時間' },
  { key: 'regular_holiday', label: '定休日' },
  { key: 'time_from_nearest_station', label: '最寄り駅からの時間' },
  { key: 'category', label: 'カテゴリ' },
  { key: 'sub_category', label: 'サブカテゴリ' },
];

interface Props {
  SearchSpot: Spot;
  onAdd?: () => void;
}

const SearchSpotCard = ({ SearchSpot, onAdd }: Props) => {
  return (
    <div className="bg-white border border-orange-300 shadow-md rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between">
      <div className="flex justify-center items-center mb-4 space-x-2 sm:space-x-6 md:space-x-10 lg:space-x-16 xl:space-x-20">
        <AddButton onClick={onAdd} />
      </div>
      <div className="flex-1">
        {/* 画像がある場合にのみ表示 */}
        {SearchSpot.photo_ids && SearchSpot.photo_ids.length > 0 ? (
          <ImageSlider photoIds={SearchSpot.photo_ids} />
        ) : (
          <p>画像がありません</p>
        )}

        <h1 className="text-2xl  font-bold mt-5 mb-5">
          {SearchSpot.store_name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {defaultFields.map((field) => (
            <div key={field.key} className="flex text-base">
              <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
                {field.label}:
              </span>
              &nbsp;
              <span className="text-gray-700 break-words">
                {String(SearchSpot[field.key as keyof Spot] || '―')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSpotCard;
