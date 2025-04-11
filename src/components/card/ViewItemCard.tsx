'use client';

import { ListItem } from '@/types/ListTypes';
import VotingButton from '../buttons/VotingButton';
import ImageSlider from '../UI/ImageSlider';
import { Text, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const defaultFields = [
  { key: 'station', label: '駅' },
  { key: 'google_rating', label: 'Google評価' },
  { key: 'custom_rating', label: 'カスタム評価' },
  { key: 'address', label: '住所' },
  { key: 'business_hours', label: '営業時間' },
  { key: 'regular_holiday', label: '定休日' },
  { key: 'time_from_nearest_station', label: '最寄り駅からの時間' },
  { key: 'category', label: 'カテゴリ' },
  { key: 'sub_category', label: 'サブカテゴリ' },
  { key: 'list_participants', label: '登録者' },
  { key: 'created_at', label: '登録日' },
];

const fieldsMap = new Map(defaultFields.map((field) => [field.key, field]));

interface Props {
  listItem: ListItem;
  selectedFields: string[];
  isVotingStart: boolean | undefined;
  isVotingCompleted: boolean | undefined;
  isAllVotingCompleted: boolean | undefined;
  isAggregationCompleted: boolean | undefined;
  voteItem: number | null | undefined;
  onVote: () => void;
}

const ViewItemCard = ({
  listItem,
  selectedFields,
  isVotingStart,
  isVotingCompleted,
  isAllVotingCompleted,
  isAggregationCompleted,
  voteItem,
  onVote,
}: Props) => {
  return (
    <div className="bg-white border border-[#B3E5FC] shadow-md rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between">
      <div className="flex justify-center items-center mb-4 space-x-2 sm:space-x-6 md:space-x-10 lg:space-x-16 xl:space-x-20">
        {isVotingStart &&
          !isVotingCompleted &&
          !isAggregationCompleted &&
          !isAllVotingCompleted && <VotingButton onClick={onVote} />}

        {isVotingCompleted ? (
          voteItem === listItem.item_id ? (
            <div className="flex items-center space-x-2 text-[#FF5722] font-bold">
              <Icon as={CheckCircleIcon} boxSize={6} />
              <Text>投票しました！</Text>
            </div>
          ) : (
            <div className="w-32 h-8" />
          )
        ) : null}
      </div>
      <div className="flex-1">
        {listItem.photos && listItem.photos.length > 0 ? (
          <ImageSlider
            photoIds={listItem.photos.map((photo) => photo.photo_url)}
          />
        ) : (
          <p>画像がありません</p>
        )}
        <h1 className="text-2xl  font-bold mt-5 mb-5">{listItem.store_name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {selectedFields.map((key) => {
            const field = fieldsMap.get(key);
            if (!field) return null;
            return (
              <div key={field.key} className="flex text-base">
                <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
                  {field.label}:
                </span>
                &nbsp;
                <span className="text-gray-700 break-words">
                  {key === 'created_at'
                    ? new Date(listItem.created_at).toLocaleDateString()
                    : key === 'list_participants'
                      ? listItem.list_participants?.participant_name || '未登録'
                      : key === 'custom_rating'
                        ? listItem.custom_rating === null
                          ? '未設定'
                          : String(listItem.custom_rating)
                        : String(listItem[key as keyof ListItem])}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewItemCard;
