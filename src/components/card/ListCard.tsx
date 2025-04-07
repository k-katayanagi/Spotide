'use client';
import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '../buttons/EditButton ';
import ViewingButton from '../buttons/ViewingButton';
import { listStatusOptions } from '@/consts/OptionList';
import { List } from '@/types/ListTypes';
import Image from 'next/image';
import useFormatDate from '@/hooks/useFormattedDate';
interface Props {
  list: List;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
}

const ListCard = ({ list, onDelete, onEdit, onView }: Props) => {
  console.log('Received list:', list);

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
  // 投票開始時刻と現在時刻を比較
  const isVotingStarted = currentTime >= votingStartTimeUTC;

  return (
    <div className="bg-white border border-orange-300 shadow-md rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between">
      <div className="flex justify-center items-center mb-4 space-x-2 sm:space-x-6 md:space-x-10 lg:space-x-16 xl:space-x-20">
        {/* 投票開始日時が現在より前でない場合にのみ編集ボタンを表示 */}
        {!isVotingStarted && (list.list_type === 'share' || list.is_admin) && (
          <EditButton className="mx-2" onClick={onEdit} />
        )}
        <ViewingButton className="mx-2" onClick={onView} disabled={!list.url} />
        {list.is_admin && <DeleteButton className="mx-2" onClick={onDelete} />}
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
            <p className="text-gray-600 whitespace-nowrap sm:ml-4">
              最終更新者:
            </p>
            <p className="text-gray-600 sm:ml-1">{list.lastUpdatedBy}</p>
          </div>

          {/* おでかけ日 & 作成日時 */}
          <div className="flex flex-col sm:flex-row">
            <p className="text-gray-600 whitespace-nowrap">おでかけ日:</p>
            <p className="text-gray-600 sm:ml-1">{formattedOutingDate}</p>
            <p className="text-gray-600 whitespace-nowrap sm:ml-4">作成日時:</p>
            <p className="text-gray-600 sm:ml-1">{formattedCreateDate}</p>
          </div>

          {/* 更新日時 */}
          <div className="flex flex-col">
            <p className="text-gray-600 whitespace-nowrap">更新日時:</p>
            <p className="text-gray-600">{formattedUpdateDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
