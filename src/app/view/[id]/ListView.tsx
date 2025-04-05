'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useListContext } from '@/contexts/ListContext';
import { useListItemContext } from '@/contexts/ListItemContext';
import { useBottomNav } from '@/contexts/BottomNavContext';
import Pagination from '@/components/pagination/Pagination';
import FilterButton from '@/components/buttons/FilterButton';
import SortButton from '@/components/buttons/SortButton';
import { ListItem } from '@/types/ListTypes';
import ViewItemCard from '@/components/card/ViewItemCard';
import EditFilterDropdown from '@/components/filterDropdown/EditFilterDropdown ';
import EditSortDropdown from '@/components/sortDropdown/EditSortDropdown';
import ViewLabelSettingModal from '@/components/modal/ViewLabelSettingModal';
import { motion } from 'framer-motion';
import { IconButton } from '@chakra-ui/react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import MenuBar from '@/components/Menu/MenuBar';
// import useListType from "@/hooks/useListType";
import EditButton from '@/components/buttons/EditButton ';
import TotallingButton from '@/components/buttons/TotallingButton';
import AggregatedResultsButton from '@/components/buttons/AggregatedResultsButton';
import UrlCopyButton from '@/components/buttons/UrlCopyButton';
import VoteConfirmModal from '@/components/modal/VoteConfirmModal';
import AggregatedResultsModal from '@/components/modal/AggregatedResultsModal';

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
  { key: 'add_by_id', label: '登録者' },
  { key: 'created_at', label: '登録日' },
];

interface Props {
  getParticipantId: number | null;
}

const ListView = ({ getParticipantId }: Props) => {
  const params = useParams();
  const url = params?.id;
  const { lists, setLists, sortLists } = useListContext();
  const { listItems, setListItems } = useListItemContext();
  const [participantId, setParticipantId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isLabelSettingOpen, setIsLabelSettingOpen] = useState(false);
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
  const [isVotingCompleted, setIsVotingCompleted] = useState<
    boolean | undefined
  >(undefined);
  const [isAllVotingCompleted, setIsAllVotingCompleted] = useState<
    boolean | undefined
  >(undefined);
  const [isAggregationCompleted, setIsAggregationCompleted] = useState<
    boolean | undefined
  >(undefined);
  const [isVotingStart, setIsVotingStart] = useState<boolean | undefined>(
    undefined,
  );
  const [isEditing, setIsEditing] = useState<boolean | undefined>(undefined);

  const {
    isOpen: isVoteModalOpen,
    onOpen: onVoteModalOpen,
    onClose: onVoteModalClose,
  } = useDisclosure();

  const {
    isOpen: isResultsModalOpen,
    onOpen: onResultsModalOpen,
    onClose: onResultsModalClose,
  } = useDisclosure();

  const menuItems = [
    { label: '表示ラベル設定', onClick: () => setIsLabelSettingOpen(true) },
  ];

  useEffect(() => {
    const fetchListAndItems = async (participantIdFromStorage: number) => {
      if (!url || !participantIdFromStorage) {
        console.log('URLまたはparticipantIdがありません');
        console.log('url', url);
        console.log('参加者', participantIdFromStorage);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/view?url=${url}&participantId=${participantIdFromStorage}`,
        );
        const data = await response.json();

        if (response.ok) {
          const { list, items, participant } = data;
          console.log('リスト', list);
          console.log('アイテム', items);
          console.log('参加者', participant);

          setLists(list);
          setListItems(items);
        } else {
          console.error('リストの取得に失敗しました:', data.error);
        }
      } catch (error) {
        console.error('API呼び出しエラー:', error);
      } finally {
        setLoading(false);
      }
    };

    const storedParticipantId = localStorage.getItem('participantId');
    console.log('storedParticipantId', storedParticipantId);

    if (storedParticipantId && storedParticipantId !== '0') {
      const id = Number(storedParticipantId);
      console.log('setParticipantId called with:', id);
      setParticipantId(id);
      fetchListAndItems(id); // ここで即座に実行
    }
  }, [url]);

  //       if (lists) {
  //         setLists(lists);
  //         console.log('投票開始日:', lists.voting_start_at);

  //         // 現在の日時を取得
  //         const currentTime = new Date().getTime();
  //         // 投票開始日をDate型に変換して比較
  //         const votingStartTime = lists.voting_start_at
  //           ? new Date(lists.voting_start_at).getTime()
  //           : 0;

  //         // 動的ボタンチェック
  //         const hasVotingStarted = currentTime >= votingStartTime;
  //         setIsVotingStart(hasVotingStarted);
  //         setIsVotingCompleted(false);
  //         setIsAllVotingCompleted(true);
  //         setIsAggregationCompleted(false);
  //         setIsEditing(true);
  //       }
  //     }
  //   }

  //   if (sortLists.length > 0) {
  //     setDisplayListItems(listItems);
  //   } else {
  //     setDisplayListItems(listItems);
  //   }
  // }, [lists, sortLists, listItems, url]);

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

  const handleVoteClick = (item: ListItem) => {
    setSelectedListItem(item);
    onVoteModalOpen();
  };

  const handleVote = () => {
    if (selectedListItem) {
      //TODO:ここに投票処理
      toast({
        title: `"${selectedListItem.store_name}" に投票しました`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      onVoteModalClose();
      setIsVotingCompleted(true);
    }
  };

  const handleTotalling = () => {
    setIsAggregationCompleted(true);
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

  const paginationZIndex = !isBottomNavOpen && !isFilter ? 'z-40' : 'z-20';

  return (
    <div className="p-3 overflow-auto relative">
      <div className="flex items-center justify-between mb-5 w-full">
        <h1 className="text-2xl font-bold flex-1">
          {lists ? lists.list_name : 'リストが見つかりません'}
        </h1>
        <div className="flex items-center gap-2 sm:gap-7">
          <UrlCopyButton />
          {/* 投票開始日以前で集計・投票未完了なら EditButton を表示 */}
          {!isVotingStart && !isVotingCompleted && !isAggregationCompleted && (
            <EditButton isEditing={isEditing} />
          )}

          {/* 全員投票完了で集計未完了なら TotallingButton を表示 */}
          {isAllVotingCompleted && !isAggregationCompleted && (
            <TotallingButton onClick={handleTotalling} />
          )}

          {/* 集計完了 && 投票完了なら AggregatedResultsButton を表示 */}
          {isAggregationCompleted && (
            <AggregatedResultsButton onClick={onResultsModalOpen} />
          )}

          <div className="flex gap-2 items-center">
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

      {/*投票確認モーダル*/}
      <VoteConfirmModal
        isOpen={isVoteModalOpen}
        onClose={onVoteModalClose}
        onConfirm={handleVote}
        selectedName={selectedListItem?.store_name || ''}
      />

      {/*集計結果モーダル*/}
      <AggregatedResultsModal
        isOpen={isResultsModalOpen}
        onClose={onResultsModalClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white border border-orange-[#B3E5FC] shadow-lg rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between hover:shadow-xl transition-shadow"
      >
        {/* リスト部分 */}
        <div
          className="overflow-auto max-h-[60vh] p-2 border border-[#0288D1] rounded-lg 
  bg-gradient-to-br from-[#B3E5FC] to-[#81D4FA]
  scrollbar-thin scrollbar-thumb-[#0288D1] scrollbar-track-[#B3E5FC]"
          ref={listContainerRef}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentListItems.map((listItem) => (
              <ViewItemCard
                key={listItem.item_id}
                listItem={listItem}
                selectedFields={selectedFields}
                isVotingStart={isVotingStart}
                isVotingCompleted={isVotingCompleted}
                isAllVotingCompleted={isAllVotingCompleted}
                isAggregationCompleted={isAggregationCompleted}
                onVote={() => handleVoteClick(listItem)}
              />
            ))}
          </div>
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

export default ListView;
