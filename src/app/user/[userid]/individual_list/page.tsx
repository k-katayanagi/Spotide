"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useListContext } from "@/contexts/ListContext";
import { useBottomNav } from "@/contexts/BottomNavContext";
import ListCard from "@/components/card/ListCard";
import Pagination from "@/components/pagination/Pagination";
import FilterButton from "@/components/buttons/FilterButton";
import SortButton from "@/components/buttons/SortButton";
import DirectoryFilterDropdown from "@/components/filterDropdown/DirectoryFilterDropdown";
import DirectorySortDropdown from "@/components/sortDropdown/DirectorySortDropdown";
import { List } from "@/types/ListTypes";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import { useDisclosure, useToast } from "@chakra-ui/react";

const IndividualList = () => {
  const { data: session } = useSession(); // セッション情報を取得
  const router = useRouter();
  const params = useParams();
  const { userid } = params; // URLの`[userid]`を取得
  const { lists, setLists, sortLists, setSortLists } = useListContext(); // Contextからリストを取得
  const [userName, setUserName] = useState<string | null>(null); // ユーザー名の状態
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const { isBottomNavOpen } = useBottomNav();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const listContainerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    // sessionのチェック（ログインしていない場合にリダイレクトしたい場合）
    if (session && session.user.id !== userid) {
      //TODO リダイレクト確認＆ページネーション確認
      // リダイレクト処理
    }

    // ユーザー名とリストを一緒に取得する処理
    const fetchData = async () => {
      if (userid) {
        // ユーザー名の取得
        const userResponse = await fetch(`/api/users/${userid}`);
        const userData = await userResponse.json();
        if (userResponse.ok) {
          setUserName(userData.user_name); // ユーザー名をステートにセット
        } else {
          console.error("ユーザー名取得エラー:", userData.error);
        }

        // リストの取得
        const listsResponse = await fetch(
          `/api/lists?userId=${userid}&listType=individual`
        );
        const listsData = await listsResponse.json();
        if (listsResponse.ok) {
          setLists(listsData); // リストデータをセット
        } else {
          console.error("リスト取得エラー:", listsData.error);
        }
      }
    };

    fetchData(); // ユーザーIDがあればデータを取得
  }, [session, userid, setLists]); // sessionとuseridが変わる度に実行

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = lists.slice(indexOfFirstItem, indexOfLastItem); // displayListsの代わりにlistsを使う
  const totalPages = Math.ceil(lists.length / itemsPerPage); // displayListsの代わりにlistsを使う

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
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
        "voting_start_at",
        "created_at",
        "updated_at",
        "outing_at",
      ];
      if (dateKeys.includes(sortKey)) {
        aValue = new Date(aValue as string);
        bValue = new Date(bValue as string);
      }

      if (typeof aValue === "number" || typeof aValue === "string") {
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

  const handleEditClick = (listId: number) => {
    router.push(`/user/${userid}/individual_list/${listId}/list_edit`);
  };

  const handleDelete = () => {
    if (selectedList) {
      setLists(lists.filter((list) => list.list_id !== selectedList.list_id)); // リストから削除
      toast({
        title: `"${selectedList.list_name}" を削除しました`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
    }
  };

  const paginationZIndex = !isBottomNavOpen && !isFilter ? "z-40" : "z-20";

  return (
    <div className="p-3 overflow-auto relative">
      <div className="flex items-center justify-between mb-5 w-full">
        <h1 className="text-2xl font-bold">{userName}さんの個人リスト一覧</h1>
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

      {/* リスト部分 */}
      <div
        className="overflow-auto max-h-[60vh] p-2 border border-[#FF5722] rounded-lg  bg-gradient-to-br from-[#FFE0B2] to-[#FFCC80]
                scrollbar-thin scrollbar-thumb-[#FF5722] scrollbar-track-[#FFE0B2]"
        ref={listContainerRef}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentLists.map((list) => {
             console.log(list);
            if (!list.list_id) {
              console.error("リストにidがありません:", list); // デバッグ用
              return null; // idがない場合は表示しない
            }

            return (
              <ListCard
                key={list.list_id}
                list={list}
                onDelete={() => handleDeleteClick(list)}
                onEdit={() => handleEditClick(list.list_id)}
              />
            );
          })}
        </div>
      </div>

      {/*削除確認モーダル*/}
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDelete}
        selectedName={selectedList?.list_name || ""}
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

export default IndividualList;
