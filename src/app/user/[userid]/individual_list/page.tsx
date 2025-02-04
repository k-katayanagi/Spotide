'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ListCard from '@/components/card/ListCard';
import Pagination from '@/components/pagination/Pagination';

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
};

const IndividualList = () => {
  const params = useParams();
  const { userid } = params;
  const [lists, setLists] = useState<List[]>([]); // 初期状態は空の配列
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 1ページあたりのリスト数

  const userId = Number(userid);

  if (isNaN(userId)) {
    return <p className="text-red-500">ユーザーIDが無効です。</p>;
  }

  // 仮データ
  const users: Record<number, User> = {
    1: { id: 1, name: 'kanon', list_name: 'リスト①', vote_start_date: 20250204, list_type: 'individual_list' },
    2: { id: 2, name: 'katayanagi', list_name: 'リスト②', vote_start_date: 20250204, list_type: 'individual_list' }
  };

  if (!(userId in users)) {
    return <p className="text-red-500">ユーザーが見つかりません。</p>;
  }

  const user = users[userId];

  useEffect(() => {
    setLists(
      Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        list_name: `リスト${i + 1}`,
        vote_start_date: 20250204,
      }))
    );
  }, []); // クライアントサイドでのみデータ取得

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = lists.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(lists.length / itemsPerPage);

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">{user.name}さんの個人リスト</h1>
      <div className="flex flex-wrap gap-6 items-center justify-start">
        {currentLists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}
    </div>
  );
};

export default IndividualList;
