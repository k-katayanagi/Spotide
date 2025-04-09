'use client';

// import { useState, useRef, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { useListContext } from '@/contexts/ListContext';
// import { useListItemContext } from '@/contexts/ListItemContext';
// import { useBottomNav } from '@/contexts/BottomNavContext';
// import Pagination from '@/components/pagination/Pagination';
// import FilterButton from '@/components/buttons/FilterButton';
// import SortButton from '@/components/buttons/SortButton';
// import { ListItem } from '@/types/ListTypes';
// import ListItemCard from '@/components/card/ListItemCard';
// import EditFilterDropdown from '@/components/filterDropdown/EditFilterDropdown ';
// import EditSortDropdown from '@/components/sortDropdown/EditSortDropdown';
// import ViewLabelSettingModal from '@/components/modal/ViewLabelSettingModal';
// import CustomLabelEditModal from '@/components/modal/CustomLabelEditModal';
// import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
// import IssueViewButton from '@/components/buttons/IssueViewButton';
// import { motion } from 'framer-motion';
// import { IconButton } from '@chakra-ui/react';
// import { useDisclosure, useToast, Spinner } from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
// import MenuBar from '@/components/Menu/MenuBar';
// import useListType from '@/hooks/useListType';
// import { List } from '@/types/ListTypes';
// import { useSearchParams } from 'next/navigation';

// type AuthListItem = {
//   listId: string;
//   participantId: number;
// };

// const defaultFields = [
//   { key: 'station', label: '駅' },
//   { key: 'google_rating', label: 'Google評価' },
//   { key: 'custom_rating', label: 'カスタム評価' },
//   { key: 'address', label: '住所' },
//   { key: 'time_to_station', label: '駅からの所要時間' },
//   { key: 'business_hours', label: '営業時間' },
//   { key: 'regular_holiday', label: '定休日' },
//   { key: 'time_from_nearest_station', label: '最寄り駅からの時間' },
//   { key: 'category', label: 'カテゴリ' },
//   { key: 'sub_category', label: 'サブカテゴリ' },
//   { key: 'list_participants', label: '登録者' },
//   { key: 'created_at', label: '登録日' },
// ];

const ListEditGuest = () => {
  // const params = useParams();
  // const { lists, setLists } = useListContext();
  // const { listItems, setListItems } = useListItemContext();
  // const listType = useListType();
  // const { listid } = params;
  // const listId = listid ? Number(listid) : null;
  // const list = lists.find((i) => i.list_id === listId);
  // const [isFilter, setIsFilter] = useState(false);
  // const [isSort, setIsSort] = useState(false);
  // const [isMenu, setIsMenu] = useState(false);
  // const [isLabelSettingOpen, setIsLabelSettingOpen] = useState(false);

  // // モーダル用の useDisclosure
  // const {
  //   isOpen: isEditModalOpen,
  //   onOpen: onEditModalOpen,
  //   onClose: onEditModalClose,
  // } = useDisclosure();

  // const {
  //   isOpen: isDeleteModalOpen,
  //   onOpen: onDeleteModalOpen,
  //   onClose: onDeleteModalClose,
  // } = useDisclosure();
  // const [selectedListItem, setSelectedListItem] = useState<ListItem | null>(
  //   null,
  // );
  // const toast = useToast();
  // const { isBottomNavOpen } = useBottomNav();
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;
  // const listContainerRef = useRef<HTMLDivElement>(null);
  // const [selectedFields, setSelectedFields] = useState<string[]>(
  //   defaultFields.map((f) => f.key),
  // );
  // const [loading, setLoading] = useState(true);
  // const [hasAccess, setHasAccess] = useState(false); // アクセス制御の状態

  // const menuItems = [
  //   {
  //     label: '場所を検索',
  //     url: `/user/${listType}/${listid}/list_edit/spot_search`,
  //   },
  //   { label: '表示ラベル設定', onClick: () => setIsLabelSettingOpen(true) },
  // ];

  // useEffect(() => {
  //   if (!listId) return;
  //   const fetchLists = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         `/api/lists-guest?&listId=${listId}`,
  //       );
  //       if (!response.ok) throw new Error('リスト取得に失敗しました');
  //       const data = await response.json();
  //       setLists(data);

  //       // アクセス制御: ローカルストレージのauthListsとリストのis_adminを確認
  //       const authLists = JSON.parse(localStorage.getItem('authLists') || '[]');
  //       const isAccessible =
  //         authLists.some(
  //           (authList: AuthListItem) =>
  //             String(authList.listId) === String(listId),
  //         ) ||
  //         data.some((list: List) => list.list_id === listId && list.is_admin);

  //       setHasAccess(isAccessible);

  //       if (!isAccessible) {
  //         alert('このリストへのアクセス権限がありません。');
  //         window.location.href = '/login'; // ログインページにリダイレクト
  //       } else {
  //         // アクセスが許可されている場合、リストアイテムを取得
  //         fetchListItems();
  //       }
  //     } catch (error) {
  //       console.error('エラー:', error);
  //     } finally {
  //       setLoading(false); // リスト取得完了時にローディングを無効化
  //     }
  //   };

  //   const fetchListItems = async () => {
  //     try {
  //       const response = await fetch(`/api/listItems?list_id=${listId}`);
  //       if (!response.ok) throw new Error('リストアイテム取得に失敗しました');
  //       const data = await response.json();
  //       setListItems(data.listItems);
  //     } catch (error) {
  //       console.error('エラー:', error);
  //       setListItems([]); // エラー時は空リストをセット
  //     }
  //   };

  //   // 最初にリスト情報を取得
  //   fetchLists();
  // }, [listId, userId, listType]);

  // // アクセスが許可されていない場合はリストを表示しない
  // if (!hasAccess) {
  //   return null;
  // }

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentListItems = Array.isArray(listItems)
  //   ? listItems.slice(indexOfFirstItem, indexOfLastItem)
  //   : [];

  // const totalPages = Math.ceil(listItems.length / itemsPerPage);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  //   if (listContainerRef.current) {
  //     listContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // };

  // const toggleFilterDropdown = () => {
  //   setIsFilter((prevState) => !prevState);
  //   console.log(isFilter);
  // };

  // const toggleSortDropdown = () => {
  //   setIsSort((prevState) => !prevState);
  //   console.log(isSort);
  // };

  // const toggleMenuDropdown = () => {
  //   setIsMenu((prevState) => !prevState);
  // };

  // const handleEditClick = (item: ListItem) => {
  //   setSelectedListItem(item);
  //   onEditModalOpen();
  // };

  // const handleDeleteClick = (item: ListItem) => {
  //   setSelectedListItem(item);
  //   onDeleteModalOpen();
  // };

  // const handleDelete = async () => {
  //   if (selectedListItem) {
  //     try {
  //       const response = await fetch('/api/listItems', {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ item_id: selectedListItem.item_id }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('削除に失敗しました');
  //       }

  //       // フロントエンドでアイテムを削除（バックエンドが成功した場合）
  //       setListItems((prevItem) =>
  //         prevItem.filter((item) => item.item_id !== selectedListItem.item_id),
  //       );

  //       toast({
  //         title: `"${selectedListItem.store_name}" を削除しました`,
  //         status: 'success',
  //         duration: 3000,
  //         isClosable: true,
  //         position: 'top',
  //       });

  //       onDeleteModalClose();
  //     } catch (error: unknown) {
  //       let errorMessage = '不明なエラーが発生しました';

  //       if (error instanceof Error) {
  //         errorMessage = error.message;
  //       } else {
  //         errorMessage = String(error);
  //       }

  //       toast({
  //         title: 'エラーが発生しました',
  //         description: errorMessage,
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //         position: 'top',
  //       });
  //     }
  //   }
  // };

  // const paginationZIndex = !isBottomNavOpen && !isFilter ? 'z-40' : 'z-20';

  return (
    <div >
      ゲスト用
    </div>
  );
};

export default ListEditGuest;
