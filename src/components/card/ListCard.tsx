'use client';
import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '../buttons/EditButton ';
import ViewingButton from '../buttons/ViewingButton';
import { listStatusOptions } from '@/consts/OptionList';
import { List } from '@/types/ListTypes';
import ImageUploader from '../UI/ImageUploader';
import useFormatDate from '@/hooks/useFormattedDate';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
  list: List;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
}

const ListCard = ({ list, onDelete, onEdit, onView }: Props) => {
  const coverImages = [
    '/images/cover/image1.jpg',
    '/images/cover/image2.jpg',
    '/images/cover/image3.jpg',
    '/images/cover/image4.jpg',
    '/images/cover/image6.jpg',
    '/images/cover/image7.jpg',
    '/images/cover/image8.jpg',
    '/images/cover/image9.jpg',
  ];

  // ランダムに画像を選んでセット
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * coverImages.length);
    return coverImages[randomIndex];
  };

  const DEFAULT_IMAGE = getRandomImage();
  const [imageUrl, setImageUrl] = useState<string>(
    list.photo_url || DEFAULT_IMAGE,
  );
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    setIsImageUploading(false);
  };

  const toggleImageUploader = () => {
    setIsImageUploading((prev) => !prev);
  };

  const getStatusLabel = (status: number): string => {
    const statusObj = listStatusOptions.find(
      (option) => option.value === status,
    );
    return statusObj ? statusObj.label : '不明';
  };

  const formattedVoteStartDate = useFormatDate(list.voting_start_at, true);
  const formattedOutingDate = useFormatDate(list.outing_at);
  const formattedCreateDate = useFormatDate(list.created_at);
  const formattedUpdateDate = useFormatDate(list.updated_at);

  const votingStartDate = new Date(list.voting_start_at);
  const currentTime = new Date().getTime();
  const votingStartTime = votingStartDate.getTime();
  const votingStartTimeUTC = votingStartTime - 9 * 60 * 60 * 1000;
  const isVotingStarted = currentTime >= votingStartTimeUTC;

  return (
    <div className="bg-white border border-orange-300 shadow-md rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between">
      <div className="flex justify-center items-center mb-4 space-x-2 sm:space-x-6 md:space-x-10 lg:space-x-16 xl:space-x-20">
        {!isVotingStarted && (list.list_type === 'share' || list.is_admin) && (
          <EditButton className="mx-2" onClick={onEdit} />
        )}
        <ViewingButton className="mx-2" onClick={onView} disabled={!list.url} />
        {list.is_admin && <DeleteButton className="mx-2" onClick={onDelete} />}
      </div>
      <div className="flex-1">
        <div className="cursor-pointer" onClick={toggleImageUploader}>
          <Image
            src={imageUrl}
            alt="List image"
            width={500}
            height={300}
            className="rounded-md object-cover w-full h-60"
          />
        </div>

        {/* 画像アップローダー（表示状態を制御） */}
        {isImageUploading && (
          <ImageUploader onImageUpload={handleImageUpload} list={list} />
        )}
        <h2 className="text-lg font-bold">{list.list_name}</h2>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 min-w-0">
          {/* 投票開始日時 */}
          <div className="flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">投票開始日時:</p>
            <p className="text-gray-600 sm:ml-1">{formattedVoteStartDate}</p>
          </div>

          {/* ステータス & 最終更新者 */}
          <div className="flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">ステータス:</p>
            <p className="text-gray-600 sm:ml-1">
              {getStatusLabel(list.status)}
            </p>
          </div>

          {/* おでかけ日 & 作成日時 */}
          <div className="flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">おでかけ日:</p>
            <p className="text-gray-600 sm:ml-1">{formattedOutingDate}</p>
            <p className="text-gray-600 whitespace-nowrap sm:ml-4">作成日:</p>
            <p className="text-gray-600 sm:ml-1">{formattedCreateDate}</p>
          </div>

          {/* 更新日時 */}
          <div className="flex flex-col">
            <p className="text-gray-600 whitespace-nowrap">更新日:</p>
            <p className="text-gray-600">{formattedUpdateDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
