'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useListContext } from '@/contexts/ListContext';
import { useListItemContext } from '@/contexts/ListItemContext';
import { useBottomNav } from '@/contexts/BottomNavContext';
import Pagination from '@/components/pagination/Pagination';
import FilterButton from '@/components/buttons/FilterButton';
import SortButton from '@/components/buttons/SortButton';
import { ListItem } from '@/types/ListTypes';
import ListItemCard from '@/components/card/ListItemCard';
import EditFilterDropdown from '@/components/filterDropdown/EditFilterDropdown ';
import EditSortDropdown from '@/components/sortDropdown/EditSortDropdown';
import ViewLabelSettingModal from '@/components/modal/ViewLabelSettingModal';
import CustomLabelEditModal from '@/components/modal/CustomLabelEditModal';
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
import IssueViewButton from '@/components/buttons/IssueViewButton';
import { motion } from 'framer-motion';
import { IconButton } from '@chakra-ui/react';
import { useDisclosure, useToast, Spinner } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import MenuBar from '@/components/Menu/MenuBar';
import useListType from '@/hooks/useListType';

const defaultFields = [
  { key: 'station', label: '駅' },
  { key: 'google_rating', label: 'Google評価' },
  { key: 'custom_rating', label: 'カスタム評価' },
  { key: 'address', label: '住所' },
  { key: 'time_to_station', label: '駅からの所要時間' },
  { key: 'business_hours', label: '営業時間' },
  { key: 'regular_holiday', label: '定休日' },
  { key: 'time_from_nearest_station', label: '最寄り駅からの時間' },
  { key: 'category', label: 'カテゴリ' },
  { key: 'sub_category', label: 'サブカテゴリ' },
  { key: 'list_participants', label: '登録者' },
  { key: 'created_at', label: '登録日' },
];

const ListEdit = () => {
  const { data: session } = useSession();
  const params = useParams();
  const { lists, setLists } = useListContext();
  const { listItems, setListItems } = useListItemContext();
  const listType = useListType();
  const { userid, listid } = params;
  const listId = listid ? Number(listid) : null; // listidを数値に変換
  const list = lists.find((i) => i.list_id === listId);
  const userId = session?.user.id;
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isLabelSettingOpen, setIsLabelSettingOpen] = useState(false);

  // モーダル用の useDisclosure
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const [selectedListItem, setSelectedListItem] = useState<ListItem | null>(
    null,
  );
  const toast = useToast();
  const { isBottomNavOpen } = useBottomNav();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>(
    defaultFields.map((f) => f.key),
  );
  const [loading, setLoading] = useState(true);

  const menuItems = [
    {
      label: '場所を検索',
      url: `/user/${userid}/${listType}/${listid}/list_edit/spot_search`,
    },
    {
      label: '共有ユーザー設定',
      url: `/user/${userid}/${listType}/${listid}/list_edit/participating_users_list`,
    },
    { label: '表示ラベル設定', onClick: () => setIsLabelSettingOpen(true) },
    { label: '投票開始日設定', onClick: () => setIsLabelSettingOpen(true) },
  ];

  useEffect(() => {
    if (!listId) return;
    const fetchListItems = async () => {
      setLoading(true); // 取得開始時にローディングを有効化
      try {
        const response = await fetch(`/api/listItems?list_id=${listId}`);
        if (!response.ok) throw new Error('リストアイテム取得に失敗しました');
        const data = await response.json();
        setListItems(data.listItems);
      } catch (error) {
        console.error('エラー:', error);
        setListItems([]);
      } finally {
        setLoading(false); // 取得完了時にローディングを無効化
      }
    };

    // リストの情報を取得する処理
    const fetchLists = async () => {
      try {
        console.log('id:', listId, userId, listType);
        const response = await fetch(
          `/api/lists?userId=${userId}&listId=${listId}&listType=${listType}`,
        );
        if (!response.ok) throw new Error('リスト取得に失敗しました');
        const data = await response.json();
        console.log('responseLists:', data);
        setLists(data); // 取得したリストをセット
        setLoading(false);
      } catch (error) {
        console.error('エラー:', error);
      }
    };

    // listsが空の場合にのみリストを取得
    if (!Array.isArray(lists) || lists.length === 0) {
      fetchLists();
    }

    // listItemsは常に取得
    fetchListItems();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListItems = Array.isArray(listItems)
    ? listItems.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(listItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFilterDropdown = () => {
    setIsFilter((prevState) => !prevState);
    console.log(isFilter);
  };

  const toggleSortDropdown = () => {
    setIsSort((prevState) => !prevState);
    console.log(isSort);
  };

  const toggleMenuDropdown = () => {
    setIsMenu((prevState) => !prevState);
  };

  const handleEditClick = (item: ListItem) => {
    setSelectedListItem(item);
    onEditModalOpen();
  };

  const handleDeleteClick = (item: ListItem) => {
    setSelectedListItem(item);
    onDeleteModalOpen();
  };

  const handleDelete = async () => {
    if (selectedListItem) {
      try {
        const response = await fetch('/api/listItems', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ item_id: selectedListItem.item_id }),
        });

        if (!response.ok) {
          throw new Error('削除に失敗しました');
        }

        // フロントエンドでアイテムを削除（バックエンドが成功した場合）
        setListItems((prevItem) =>
          prevItem.filter((item) => item.item_id !== selectedListItem.item_id),
        );

        toast({
          title: `"${selectedListItem.store_name}" を削除しました`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });

        onDeleteModalClose();
      } catch (error: unknown) {
        let errorMessage = '不明なエラーが発生しました';

        if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = String(error);
        }

        toast({
          title: 'エラーが発生しました',
          description: errorMessage,
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
        <h1 className="text-2xl font-bold flex-1">
          {loading
            ? '取得中...'
            : list?.list_name ||
              lists[0]?.list_name ||
              'リストが見つかりません'}
        </h1>
        <div className="flex items-center gap-2">
          <IssueViewButton listId={listId} />

          {/* フィルター & ソートボタンをアイコンと揃える */}
          <div className="flex gap-5 items-center">
            <FilterButton onClick={toggleFilterDropdown} disabled={isSort} />
            <SortButton onClick={toggleSortDropdown} disabled={isFilter} />
            <IconButton
              icon={<HamburgerIcon boxSize={7} />}
              variant="unstyled"
              aria-label="メニュー"
              className="flex items-center justify-center text-black block w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
              onClick={toggleMenuDropdown}
            />
          </div>
        </div>
      </div>

      {isFilter && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <EditFilterDropdown toggleFilterDropdown={toggleFilterDropdown} />
        </div>
      )}

      {isSort && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <EditSortDropdown
          // toggleSortDropdown={toggleSortDropdown}
          // onSortChange={handleSortChange}
          />
        </div>
      )}

      {/*absoluteにしてリストの上に被せる */}
      {isMenu && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center">
          <MenuBar onClick={toggleMenuDropdown} menuItems={menuItems} />
          <button
            className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-xl 
                 hover:bg-gray-200 transition-all duration-200 z-20 
                 sm:absolute sm:top-6 sm:right-6 mt-4 ml-4 sm:mt-0"
            onClick={toggleMenuDropdown}
          >
            <CloseIcon boxSize={5} />
          </button>
        </div>
      )}

      {/* 表示設定モーダル */}
      <ViewLabelSettingModal
        isOpen={isLabelSettingOpen}
        onClose={() => setIsLabelSettingOpen(false)}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
      />

      {/* カスタム設定モーダル */}
      <CustomLabelEditModal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        selectedName={selectedListItem?.store_name || ''}
      />

      {/*削除確認モーダル*/}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onConfirm={handleDelete}
        selectedName={selectedListItem?.store_name || ''}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white border border-[#C8E6C9] shadow-lg rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between hover:shadow-xl transition-shadow"
      >
        {/* リスト部分 */}
        <div
          className="overflow-auto h-[65vh] p-2 border border-[#43A047] rounded-lg bg-gradient-to-br from-[#C8E6C9] to-[#A5D6A7]scrollbar-thin   scrollbar-thin scrollbar-thumb-[#2E7D32] scrollbar-track-[#C8E6C9]"
          ref={listContainerRef}
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Spinner size="xl" color="orange.500" />
            </div>
          ) : currentListItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentListItems.map((listItem) => (
                <ListItemCard
                  key={listItem.item_id}
                  listItem={listItem}
                  selectedFields={selectedFields}
                  onEdit={() => handleEditClick(listItem)}
                  onDelete={() => handleDeleteClick(listItem)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center text-gray-500 mt-4 w-full h-full">
              アイテムが追加されていません
            </div>
          )}
        </div>
      </motion.div>

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

export default ListEdit;
