'use client';
import { useState } from 'react';
import ListSelect from '../ListSelect';
import { listInfo, Sort } from '@/consts/OptionList';
import OkButton from '../buttons/OkButton';
import { List } from '@/types/ListTypes';

type Props = {
  toggleSortDropdown: () => void;
  onSortChange: (sortKey: keyof List, order: number) => void;
};

const DirectorySortDropdown = ({ toggleSortDropdown, onSortChange }: Props) => {
  const filteredListInfo = listInfo.filter(
    (item) => item.value !== 'status' && item.value !== 'lastUpdatedBy',
  );

  const defaultSortKey = 'create_date' as keyof List;
  const isCreateDateAvailable = filteredListInfo.some(
    (item) => item.value === defaultSortKey,
  );

  const [selectedListInfo, setSelectedListInfo] = useState<keyof List>(
    isCreateDateAvailable
      ? defaultSortKey
      : (filteredListInfo[0]?.value as keyof List),
  );
  const [selectedSort, setSelectedSort] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSortChange(selectedListInfo, selectedSort);
    toggleSortDropdown();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-[rgba(255,224,178,0.98)] to-[rgba(255,183,77,0.98)] border-4 border-[#FF9800] rounded-lg p-6 shadow-md 
                min-h-[50vh] max-h-[80vh] lg:min-h-[30vh] lg:max-h-[70vh] 
                flex flex-col items-center mx-auto"
    >
      <div className="m-auto">
        <div className="flex gap-7 justify-center items-center h-full w-full">
          {/* 並び替え基準選択 */}
          <ListSelect
            options={filteredListInfo}
            onSelect={(value) => setSelectedListInfo(value as keyof List)}
            className="w-[150px] h-[40px] max-w-[400px] text-center border border-black"
          />
          <p>
            {
              filteredListInfo.find((item) => item.value === selectedListInfo)
                ?.label
            }
          </p>

          {/* 昇順 / 降順選択 */}
          <ListSelect
            options={Sort}
            onSelect={(value) => setSelectedSort(Number(value))}
            className="w-full h-[40px] max-w-[100px] text-center border border-black"
          />
          <p>{Sort.find((item) => item.value === selectedSort)?.label}</p>
        </div>

        {/* OKボタン（フォーム送信） */}
        <div className="flex justify-end w-full">
          <OkButton />
        </div>
      </div>
    </form>
  );
};

export default DirectorySortDropdown;
