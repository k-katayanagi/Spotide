'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useListContext } from '@/contexts/ListContext';
import { useBottomNav } from '@/contexts/BottomNavContext';
import ListCard from '@/components/card/ListCard';
import Pagination from '@/components/pagination/Pagination';
import FilterButton from '@/components/buttons/FilterButton';
import SortButton from '@/components/buttons/SortButton';
import DirectoryFilterDropdown from '@/components/filterDropdown/DirectoryFilterDropdown';
import DirectorySortDropdown from '@/components/sortDropdown/DirectorySortDropdown';
import { List } from '@/types/ListTypes';
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
import { useDisclosure, useToast, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const ShareList = () => {
  const { data: session } = useSession(); // セッションからユーザー情報を取得
  const router = useRouter();
  const { lists, setLists, setSortLists } = useListContext(); // Contextからリストを取得
  const [userName, setUserName] = useState<string | null>(null); // ユーザー名の状態
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const { isBottomNavOpen } = useBottomNav();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const listContainerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  // セッションが存在するかチェックし、user.idを取得
  const userId = session?.user.id;

  useEffect(() => {
    // ユーザー名とリストを一緒に取得する処理
    const fetchData = async () => {
      // ユーザー名の取得
      const userResponse = await fetch(`/api/users/${userId}`);
      const userData = await userResponse.json();
      if (userResponse.ok) {
        setUserName(userData.user_name); // ユーザー名をステートにセット
      } else {
        console.error('ユーザー名取得エラー:', userData.error);
      }

      // リストの取得
      const listsResponse = await fetch(
        `/api/lists?userId=${userId}&listType=share`,
      );
      const listsData = await listsResponse.json();
      console.log('取得したリストデータ:', listsData);

      if (listsResponse.ok) {
        if (Array.isArray(listsData)) {
          setLists(listsData); // リストデータをセット
          setLoading(false);
          console.error('リストデータが配列ではありません:', listsData);
        }
      } else {
        console.error('リスト取得エラー:', listsData.error);
      }
    };

    fetchData(); // ユーザーIDがあればデータを取得
  }, [session, userId, setLists]); // sessionとuserIdが変わる度に実行

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = Array.isArray(lists)
    ? lists.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Math.ceil(lists.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFilterDropdown = () => {
    setIsFilter((prevState) => !prevState);
  };

  const toggleSortDropdown = () => {
    setIsSort((prevState) => !prevState);
  };

  const handleSortChange = (sortKey: keyof List, order: number) => {
    const sortedLists = [...lists].sort((a, b) => {
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      const dateKeys: Array<keyof List> = [
        'voting_start_at',
        'created_at',
        'updated_at',
        'outing_at',
      ];
      if (dateKeys.includes(sortKey)) {
        aValue = new Date(aValue as string);
        bValue = new Date(bValue as string);
      }

      if (typeof aValue === 'number' || typeof aValue === 'string') {
        if (bValue !== undefined) {
          return order === 0
            ? aValue > bValue
              ? 1
              : -1
            : aValue < bValue
              ? 1
              : -1;
        } else {
          return 0;
        }
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return order === 0
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });
    setSortLists(sortedLists);
  };

  const handleDeleteClick = (list: List) => {
    setSelectedList(list);
    onOpen();
  };

  // 編集ページに遷移する関数（ここでルーティングを管理）
  const handleEditClick = (listId: number) => {
    router.push(`/user/${userId}/share_list/${listId}/list_edit`);
  };

  // 閲覧ページに遷移する関数
  const handleViewClick = (list: List) => {
    router.push(`/view/${list.url}`);
  };

  const handleDelete = async () => {
    if (selectedList) {
      // APIを呼び出してリストを削除
      const response = await fetch('/api/lists', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listId: selectedList.list_id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setLists(lists.filter((list) => list.list_id !== selectedList.list_id)); // リストから削除
        toast({
          title: `"${selectedList.list_name}" を削除しました`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        onClose();
      } else {
        toast({
          title: '削除に失敗しました',
          description: result.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  };

  const paginationZIndex = !isBottomNavOpen && !isFilter ? 'z-40' : 'z-20';

  return (
    <div className="p-3 overflow-auto relative">
      <div className="flex items-center justify-between mb-5 w-full">
        <h1 className="text-2xl font-bold">{userName}さんの共有リスト一覧</h1>
        <div className="flex gap-2 mb- justify-end relative z-10">
          <FilterButton onClick={toggleFilterDropdown} disabled={isSort} />
          <SortButton onClick={toggleSortDropdown} disabled={isFilter} />
        </div>
      </div>

      {isFilter && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <DirectoryFilterDropdown
            toggleFilterDropdown={toggleFilterDropdown}
          />
        </div>
      )}

      {isSort && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <DirectorySortDropdown
            toggleSortDropdown={toggleSortDropdown}
            onSortChange={handleSortChange}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white border border-[#C8E6C9] shadow-lg rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between hover:shadow-xl transition-shadow"
      >
        {/* リスト部分 */}
        <div
          className="overflow-auto h-[65vh] p-2 border border-[#FF5722] rounded-lg  bg-gradient-to-br from-[#FFE0B2] to-[#FFCC80]
                scrollbar-thin scrollbar-thumb-[#FF5722] scrollbar-track-[#FFE0B2]"
          ref={listContainerRef}
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Spinner size="xl" color="orange.500" />
            </div>
          ) : currentLists.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentLists.map((list) => {
                if (!list.list_id) {
                  return null; // idがない場合は表示しない
                }

                return (
                  <ListCard
                    key={list.list_id}
                    list={list}
                    onDelete={() => handleDeleteClick(list)}
                    onEdit={() => handleEditClick(list.list_id)}
                    onView={() => handleViewClick(list)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center text-gray-500 mt-4 w-full h-full">
              リストがありません
            </div>
          )}
        </div>
      </motion.div>

      {/*削除確認モーダル*/}
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDelete}
        selectedName={selectedList?.list_name || ''}
      />

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className={`mt-6 relative ${paginationZIndex}`}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ShareList;
