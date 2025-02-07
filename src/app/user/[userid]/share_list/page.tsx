'use client';

import { useState, useEffect,useRef } from 'react';
import { useParams } from 'next/navigation';
import ListCard from '@/components/card/ListCard';
import Pagination from '@/components/pagination/Pagination';
import { testList } from './testlistdata';
import IconListCreatePlusButton from'@/components/buttons/IconListCreatePlusButton'
import FilterButton from '@/components/buttons/FilterButton';
import SortButton from '@/components/buttons/SortButton';

type User = {
  id: number;
  name: string;
  list_name: string;
  vote_start_date: number;
  list_type: string;
};

type List = {
  id: number;
  list_name: string;
  vote_start_date: number;
  status: string;
  lastUpdatedBy: string;
  create_date: number;
  update_date: number;
};

const IndividualList = () => {
  const params = useParams();
  const userId = Number(params?.userid);
  const [lists, setLists] = useState<List[]>(testList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const listContainerRef = useRef<HTMLDivElement>(null); // スクロール位置を制御するためのref


  const users: Record<number, User> = {
    1: { id: 1, name: 'kanon', list_name: 'リスト①', vote_start_date: 20250204, list_type: 'individual_list' },
    2: { id: 2, name: 'katayanagi', list_name: 'リスト②', vote_start_date: 20250204, list_type: 'individual_list' },
  };

  if (isNaN(userId)) {
    return <p className="text-red-500">ユーザーIDが無効です。</p>;
  }

  if (!(userId in users)) {
    return <p className="text-red-500">ユーザーが見つかりません。</p>;
  }

  const user = users[userId];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = lists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(lists.length / itemsPerPage);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // ページネーション時にスクロールを最上部に戻す
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({
        top: 0, // 最上部にスクロール
        behavior: 'smooth', // スムーズにスクロール
      });
    }
  };


  return (
    <div className="p-5  overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{user.name}さんの共有リスト一覧</h1>
        <div  className="flex gap-3 mb-5 justify-end">
          <IconListCreatePlusButton />
          <FilterButton/>
          <SortButton/>
        </div>
      </div>

      {/* リスト部分をスクロール可能に */}
      <div className="overflow-auto max-h-[60vh] p-2 border border-gray-300 rounded-lg" ref={listContainerRef} >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentLists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default IndividualList;