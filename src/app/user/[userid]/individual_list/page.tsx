"use client";

import { useState, useRef,useEffect } from "react";
import { useParams } from "next/navigation";
import { useListContext } from "@/contexts/ListContext";
import { useBottomNav } from "@/contexts/BottomNavContext";
import ListCard from "@/components/card/ListCard";
import Pagination from "@/components/pagination/Pagination";
import FilterButton from "@/components/buttons/FilterButton";
import SortButton from "@/components/buttons/SortButton";
import DirectoryFilterDropdown from "@/components/filterDropdown/DirectoryFilterDropdown";
import DirectorySortDropdown from "@/components/sortDropdown/DirectorySortDropdown";

type User = {
  id: number;
  name: string;
  list_name: string;
  list_type: string;
};

const IndividualList = () => {
  const params = useParams();
  const userId = Number(params?.userid);
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const { isBottomNavOpen } = useBottomNav();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { lists,sortLists } = useListContext();
  const [displayLists, setDisplayLists] = useState<List[]>(lists); // 表示用リスト

  useEffect(() => {
    if (sortLists.length > 0) {
      setDisplayLists(sortLists); // フィルター適用時に sortLists をセット
    } else {
      setDisplayLists(lists); // フィルター解除時に全リストに戻す
    }
  }, [sortLists, lists]); // lists が変わったときも更新
  
 

  const users: Record<number, User> = {
    1: {
      id: 1,
      name: "kanon",
      list_name: "リスト①",
      list_type: "individual_list",
    },
    2: {
      id: 2,
      name: "katayanagi",
      list_name: "リスト②",
      list_type: "individual_list",
    },
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
  const currentLists = displayLists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayLists.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
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

  const paginationZIndex = !isBottomNavOpen && !isFilter ? "z-40" : "z-20";

  return (
    <div className="p-3 overflow-auto relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{user.name}さんの個人リスト一覧</h1>
        <div className="flex gap-2 mb- justify-end relative z-10">
          <FilterButton onClick={toggleFilterDropdown} disabled={isSort} />
          <SortButton onClick={toggleSortDropdown} disabled={isFilter} />
        </div>
      </div>

      {isFilter && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <DirectoryFilterDropdown toggleFilterDropdown={toggleFilterDropdown}/>
        </div>
      )}

      {isSort && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <DirectorySortDropdown />
        </div>
      )}

      {/* リスト部分 */}
      <div
        className="overflow-auto max-h-[60vh] p-2 border border-[#FF5722] rounded-lg  bg-gradient-to-br from-[#FFE0B2] to-[#FFCC80]
                scrollbar-thin scrollbar-thumb-[#FF5722] scrollbar-track-[#FFE0B2]"
        ref={listContainerRef}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentLists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      </div>

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
