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
import { useDisclosure, useToast, Spinner } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import MenuBar from '@/components/Menu/MenuBar';
import { TParticipantingUser } from '@/types/UserTypes ';
import EditButton from '@/components/buttons/EditButton ';
import TotallingButton from '@/components/buttons/TotallingButton';
import AggregatedResultsButton from '@/components/buttons/AggregatedResultsButton';
import UrlCopyButton from '@/components/buttons/UrlCopyButton';
import VoteConfirmModal from '@/components/modal/VoteConfirmModal';
import AggregatedResultsModal from '@/components/modal/AggregatedResultsModal';
import { useSession } from 'next-auth/react';
import useNavigation from '@/hooks/useNavigation';

type Props = {
  GetListId: string | null;
  isAdmin: boolean;
};

type AuthListItem = {
  listId: string;
  participantId: number;
};

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

const ListView = ({ GetListId, isAdmin }: Props) => {
  const { data: session } = useSession();
  const params = useParams();
  const url = params?.id;
  const { lists, setLists } = useListContext();
  const { listItems, setListItems } = useListItemContext();
  const { handleNavigateTo } = useNavigation();
  const [participant, setParticipant] = useState<TParticipantingUser | null>(
    null,
  );
  const [participantId, setParticipantId] = useState<number | null>(null);
  const [voteItem, setVoteItem] = useState<number | null | undefined>(null);
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
  >(false);
  const [isAllVotingCompleted, setIsAllVotingCompleted] = useState<
    boolean | undefined
  >(false);
  const [isAggregationCompleted, setIsAggregationCompleted] = useState<
    boolean | undefined
  >(false);
  const [isVotingStart, setIsVotingStart] = useState<boolean | undefined>(
    false,
  );
  const [isEditing, setIsEditing] = useState<boolean | undefined>(false);

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

  const isCreator = lists[0]?.creator_id === session?.user.id;
  const menuItems = [
    { label: '表示ラベル設定', onClick: () => setIsLabelSettingOpen(true) },
    ...(isCreator
      ? [
          {
            label: '共有ユーザー設定',
            url: `/user/${lists[0]?.list_type}_list/${lists[0]?.list_id}/list_edit/participating_users_list?votingStart=${isVotingStart}`,
          },
        ]
      : []),
  ];

  useEffect(() => {
    const fetchListAndItemsAsAdmin = async () => {
      if (!url || !session?.user?.id) return;
  
      setLoading(true);
      try {
        const res = await fetch(`/api/view/admin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url,
            userId: session.user.id,
          }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          const { list, items, participant } = data;
  
          const listArray = Array.isArray(list) ? list : [list];
          setLists(listArray);
          setListItems(items);
          setParticipant(participant);
          setParticipantId(participant?.participant_id ?? null);
          setVoteItem(participant?.item_id ?? null);
  
          if (listArray.length > 0) {
            const currentTime = new Date().getTime();
            const votingStartDate = new Date(listArray[0].voting_start_at);
            const votingStartTimeUTC = votingStartDate.getTime() - 9 * 60 * 60 * 1000;
  
            const hasVotingStarted = currentTime >= votingStartTimeUTC;
            setIsVotingStart(hasVotingStarted);
            setIsVotingCompleted(participant?.is_vote ?? false);
            setIsAllVotingCompleted(listArray[0].is_voting_completed);
            setIsAggregationCompleted(listArray[0].is_aggregation_completed);
            setIsEditing(false);
          }
        } else {
          console.error('管理者リスト取得失敗:', data.error);
        }
      } catch (e) {
        console.error('管理者APIエラー:', e);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchListAndItems = async (participantIdFromStorage: number) => {
      if (!url || !participantIdFromStorage) {
        console.log('URLまたはparticipantIdがありません');
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
          const listArray = Array.isArray(list) ? list : [list];
          setLists(listArray);
          setListItems(items);
          setParticipant(participant);
          setParticipantId(participantIdFromStorage);
          setVoteItem(participant.item_id);
  
          if (listArray.length > 0) {
            const currentTime = new Date().getTime();
            const votingStartDate = new Date(listArray[0].voting_start_at);
            const votingStartTimeUTC = votingStartDate.getTime() - 9 * 60 * 60 * 1000;
  
            const hasVotingStarted = currentTime >= votingStartTimeUTC;
            setIsVotingStart(hasVotingStarted);
            setIsVotingCompleted(participant.is_vote);
            setIsAllVotingCompleted(listArray[0].is_voting_completed);
            setIsAggregationCompleted(listArray[0].is_aggregation_completed);
            setIsEditing(false);
          }
        } else {
          console.error('リストの取得に失敗しました:', data.error);
        }
      } catch (error) {
        console.error('API呼び出しエラー:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // 管理者だったら専用APIでfetch
    if (isAdmin) {
      fetchListAndItemsAsAdmin();
    }
  
    // 一般参加者用の処理
    const storedData = localStorage.getItem('authLists');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const listId = GetListId;
        const foundParticipant = parsedData.find(
          (item: AuthListItem) => item.listId === listId,
        );
  
        if (foundParticipant) {
          const participantId = foundParticipant.participantId;
          fetchListAndItems(participantId);
        } else {
          console.log('指定されたlistIdに対応する参加者が見つかりません');
        }
      } catch (error) {
        console.error('localStorageのデータをパースできませんでした', error);
      }
    } else {
      console.log('localStorageにauthListsが存在しません');
    }
  }, [
    url,
    isVotingStart,
    isVotingCompleted,
    isAllVotingCompleted,
    isAggregationCompleted,
    isEditing,
  ]);
  

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

  const handleVote = async () => {
    setVoteItem(selectedListItem?.item_id);
    if (selectedListItem) {
      try {
        const response = await fetch('/api/view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participantId: participantId,
            listItemId: selectedListItem.item_id,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast({
            title: `"${selectedListItem.store_name}" に投票しました`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          onVoteModalClose();
          setIsVotingCompleted(true);
        } else {
          toast({
            title: '投票に失敗しました',
            description: data.error || '予期せぬエラーが発生しました',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        }
      } catch (error) {
        console.error('投票エラー:', error);
      }
    }
  };

  const handleTotalling = async () => {
    if (!lists[0].list_id) return;
    const listId = lists[0].list_id;

    try {
      const response = await fetch('/api/view/totalling', {
        method: 'POST',
        body: JSON.stringify({ listId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setIsAggregationCompleted(true);
        toast({
          title: `"集計が完了しました`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: '集計に失敗しました',
          description: result.error || '予期せぬエラーが発生しました',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description:
          (error as Error).message ||
          'ネットワークエラーなどの可能性があります',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleEdit = () => {
    if (!lists[0].list_id) return;
    const listId = lists[0].list_id;
    const listType = lists[0].list_type;
    handleNavigateTo(`/user/${listType}_list/${listId}/list_edit?`);
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'URLをコピーしました!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      toast({
        title: 'コピーに失敗しました',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const paginationZIndex = !isBottomNavOpen && !isFilter ? 'z-40' : 'z-20';

  return (
    <div className="p-3 overflow-auto relative">
      <div className="flex items-center justify-between mb-5 w-full">
        <h1 className="text-2xl font-bold flex-1">
          {loading
            ? '取得中...'
            : lists[0].list_name || 'リストが見つかりません'}
        </h1>
        <div className="flex items-center gap-2 sm'リストが見つかりません':gap-7">
          <UrlCopyButton onClick={handleCopy} />
          {!loading &&
            lists.length > 0 &&
            participant &&
            ((lists[0].list_type === 'individual' &&
              participant.is_admin === true) ||
              lists[0].list_type === 'share') &&
            !isVotingStart &&
            !isVotingCompleted &&
            !isAggregationCompleted && (
              <EditButton isEditing={isEditing} onClick={handleEdit} />
            )}
          {isAllVotingCompleted &&
            !isAggregationCompleted &&
            participant?.is_admin &&
            participant?.user_id === session?.user?.id && (
              <TotallingButton onClick={handleTotalling} />
            )}

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
          <EditSortDropdown />
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
        listItems={listItems}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white border border-orange-[#B3E5FC] shadow-lg rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between hover:shadow-xl transition-shadow"
      >
        {/* リスト部分 */}
        <div
          className="overflow-auto  h-[66vh] lg:h-[60vh] p-2 border border-[#0288D1] rounded-lg 
  bg-gradient-to-br from-[#B3E5FC] to-[#81D4FA]
  scrollbar-thin scrollbar-thumb-[#0288D1] scrollbar-track-[#B3E5FC]"
          ref={listContainerRef}
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Spinner size="xl" color="blue.500" />
            </div>
          ) : currentListItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentListItems.map((listItem) => (
                <ViewItemCard
                  key={listItem.item_id}
                  listItem={listItem}
                  voteItem={voteItem}
                  selectedFields={selectedFields}
                  isVotingStart={isVotingStart}
                  isVotingCompleted={isVotingCompleted}
                  isAllVotingCompleted={isAllVotingCompleted}
                  isAggregationCompleted={isAggregationCompleted}
                  onVote={() => handleVoteClick(listItem)}
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
      {!isBottomNavOpen && (
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
