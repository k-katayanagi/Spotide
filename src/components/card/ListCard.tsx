'use client';
import { List } from '@/types/ListTypes';
import ImageUploader from '../UI/ImageUploader';
import useFormatDate from '@/hooks/useFormattedDate';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  list: List;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
  openMenuId: number | null;
  setOpenMenuId: (id: number | null) => void;
}

const ListCard = ({
  list,
  onDelete,
  onEdit,
  onView,
  openMenuId,
  setOpenMenuId,
}: Props) => {
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
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(
    list.photo_url ||
      coverImages[Math.floor(Math.random() * coverImages.length)],
  );
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [hasViewed, setHasViewed] = useState<boolean>(!!list.url);
  const isOpen = openMenuId === list.list_id;

  const handleGoToUserSettings = () => {
    router.push(
      `/user/${list.list_type}_list/${list.list_id}/list_edit/participating_users_list?votingStart=${isVotingStarted}`,
    );
  };

  const handleView = async () => {
    await onView();
    setHasViewed(true);
  };

  const toggleMenu = () => {
    if (isOpen) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(list.list_id);
    }
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    setIsImageUploading(false);
  };

  const toggleImageUploader = () => {
    setIsImageUploading((prev) => !prev);
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
  const viewButtonText = hasViewed ? '👁 閲覧' : '👁 招待URL発行';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu-button') && !target.closest('.menu-content')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border shadow-md overflow-hidden h-[50vh] lg:h-[55vh] ">
      <div className="flex items-center justify-between bg-white px-4 py-2 rounded-t-xl">
        <h1 className="text-2xl font-bold">{list.list_name}</h1>

        <div ref={menuRef} className="relative flex items-center gap-6">
          {isVotingStarted && (
            <span
              className={`px-3 py-1 text-base font-semibold rounded-full ${
                list.is_aggregation_completed
                  ? 'bg-blue-100 text-blue-600'
                  : list.is_voting_completed
                    ? list.is_admin
                      ? 'bg-orange-100 text-red-600'
                      : 'bg-orange-100 text-red-600'
                    : 'bg-orange-100 text-red-600'
              }`}
            >
              {list.is_aggregation_completed
                ? '集計完了'
                : list.is_voting_completed
                  ? list.is_admin
                    ? '集計してください'
                    : '集計待ちです'
                  : '投票開始しました'}
            </span>
          )}

          <button
            onClick={toggleMenu}
            className="menu-button text-2xl text-black"
            ref={buttonRef}
          >
            <span>&#9776;</span>
          </button>

          {isOpen && (
            <div className="menu-content absolute z-50 right-0 top-full mt-2 bg-white border rounded-md shadow-lg w-auto min-w-max">
              {!isVotingStarted &&
                (list.list_type === 'share' || list.is_admin) && (
                  <button
                    onClick={onEdit}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600 whitespace-nowrap"
                  >
                    ✏️ 編集
                  </button>
                )}
              <button
                onClick={handleView}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600 whitespace-nowrap"
              >
                {viewButtonText}
              </button>
              {list.is_admin && (
                <button
                  onClick={handleGoToUserSettings}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-orange-600 whitespace-nowrap"
                >
                  👫 共有ユーザー設定
                </button>
              )}
              {list.is_admin && (
                <button
                  onClick={onDelete}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 whitespace-nowrap"
                >
                  🗑 削除
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="cursor-pointer" onClick={toggleImageUploader}>
          <Image
            src={imageUrl}
            alt="List image"
            width={500}
            height={500}
            className="rounded-md object-cover px-2 w-full h-[30vh]"
          />
        </div>
        {isImageUploading && (
          <ImageUploader onImageUpload={handleImageUpload} list={list} />
        )}
      </div>

      <div className="bg-[#f5f5f5] h-[15vh] lg:h-[19vh] p-4 m-2 rounded-lg shadow-sm border">
        <h1 className="text-gray-800 font-semibold mb-2 lg:text-xl">
          日程情報
        </h1>

        <div className="space-y-1 text-2xl sm:text-xl text-gray-700">
          <p>投票開始日時: {formattedVoteStartDate}</p>
          <p>おでかけ日: {formattedOutingDate}</p>
          <p>作成日: {formattedCreateDate}</p>
          <p>更新日: {formattedUpdateDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
