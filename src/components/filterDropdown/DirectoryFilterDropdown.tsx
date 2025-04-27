'use client';
import { useState } from 'react';
import ListNameInput from '../inputbox/ListNameInput';
import CalendarPicker from '../dateTimePicker/CalendarPicker ';
import OkButton from '../buttons/OkButton';
import { useListContext } from '@/contexts/ListContext';
import { List } from '@/types/ListTypes';

type Props = {
  toggleFilterDropdown: () => void;
};

const DirectoryFilterDropdown = ({ toggleFilterDropdown }: Props) => {
  const [error, setError] = useState('');
  const { lists, setSortLists } = useListContext();
  const [listName, setListName] = useState('');
  const [outingStartDate, setOutingStartDate] = useState<Date | null>(null);
  const [outingEndDate, setOutingEndDate] = useState<Date | null>(null);
  const [createStartDate, setCreateStartDate] = useState<Date | null>(null);
  const [createEndDate, setCreateEndDate] = useState<Date | null>(null);
  const [updateStartDate, setUpdateStartDate] = useState<Date | null>(null);
  const [updateEndDate, setUpdateEndDate] = useState<Date | null>(null);

  const handleFilterApply = (e: React.FormEvent) => {
    e.preventDefault();
    let filteredLists = [...lists];

    if (listName) {
      const normalizeToHiragana = (str: string) =>
        str
          .normalize('NFKC')
          .toLowerCase()
          .replace(/[\u30a1-\u30f6]/g, (match) =>
            String.fromCharCode(match.charCodeAt(0) - 0x60),
          );

      const normalizedInput = normalizeToHiragana(listName);

      filteredLists = filteredLists.filter((list) =>
        normalizeToHiragana(list.list_name).includes(normalizedInput),
      );
    }

    const filterByDate = (
      dateField: keyof Pick<List, 'outing_at' | 'created_at' | 'updated_at'>,
      startDate: Date | null,
      endDate: Date | null,
    ) => {
      return (list: List) => {
        const targetDate = new Date(list[dateField]);
        if (startDate && !endDate)
          return targetDate.toDateString() === startDate.toDateString();
        if (!startDate && endDate)
          return targetDate.toDateString() === endDate.toDateString();
        return (
          (!startDate || targetDate >= startDate) &&
          (!endDate || targetDate <= endDate)
        );
      };
    };

    if (outingStartDate || outingEndDate) {
      filteredLists = filteredLists.filter(
        filterByDate('outing_at', outingStartDate, outingEndDate),
      );
    }

    if (createStartDate || createEndDate) {
      filteredLists = filteredLists.filter(
        filterByDate('created_at', createStartDate, createEndDate),
      );
    }

    if (updateStartDate || updateEndDate) {
      filteredLists = filteredLists.filter(
        filterByDate('updated_at', updateStartDate, updateEndDate),
      );
    }

    setSortLists(filteredLists);
    toggleFilterDropdown();
  };

  return (
    <div
      className="bg-gradient-to-b from-[rgba(255,224,178,0.98)] to-[rgba(255,183,77,0.98)] border-4 border-[#FF9800] rounded-lg p-6 shadow-md 
                min-h-[50vh] max-h-[80vh] lg:min-h-[30vh] lg:max-h-[70vh] 
                flex flex-col items-center mx-auto"
    >
      <form onSubmit={handleFilterApply}>
        <div className="m-auto">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center w-fit">
              <div className="self-start">
                <ListNameInput
                  listName={listName}
                  onChange={setListName}
                  error={error}
                  setError={setError}
                  className="text-lg w-[180px] sm:w-[300px] md:w-[380px] h-[40px] border border-black"
                />
              </div>
            </div>

            <div className="flex justify-center w-fit">
              <div className="w-full max-w-[400px] flex flex-col sm:flex-row gap-1 justify-center self-start">
                <div className="flex flex-col items-start w-full">
                  <CalendarPicker
                    title="登録日"
                    className="w-full max-w-[180px] text-center"
                    value={createStartDate}
                    onChange={setCreateStartDate}
                  />
                </div>
                <span className="flex justify-center lg:justify-end items-end">
                  ～
                </span>
                <div className="flex flex-col justify-end items-end w-full">
                  <CalendarPicker
                    className="w-full max-w-[180px] text-center"
                    value={createEndDate}
                    onChange={setCreateEndDate}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center w-fit">
              <div className="w-full max-w-[400px] flex flex-col sm:flex-row gap-1 justify-center self-start">
                <div className="flex flex-col items-start w-full">
                  <CalendarPicker
                    title="更新日"
                    className="w-full max-w-[180px] text-center"
                    value={updateStartDate}
                    onChange={setUpdateStartDate}
                  />
                </div>
                <span className="flex justify-center lg:justify-end items-end">
                  ～
                </span>
                <div className="flex flex-col justify-end items-end w-full">
                  <CalendarPicker
                    className="w-full max-w-[180px] text-center"
                    value={updateEndDate}
                    onChange={setUpdateEndDate}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center w-fit">
              <div className="w-full max-w-[400px] flex flex-col sm:flex-row gap-1 justify-center self-start">
                <div className="flex flex-col items-start w-full">
                  <CalendarPicker
                    title="おでかけ日"
                    className="w-full max-w-[180px] text-center"
                    value={outingStartDate}
                    onChange={setOutingStartDate}
                  />
                </div>
                <span className="flex justify-center lg:justify-end items-end">
                  ～
                </span>
                <div className="flex flex-col justify-end items-end w-full">
                  <CalendarPicker
                    className="w-full max-w-[180px] text-center"
                    value={outingEndDate}
                    onChange={setOutingEndDate}
                  />
                </div>
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

export default DirectoryFilterDropdown;
