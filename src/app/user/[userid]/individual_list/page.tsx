"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useListContext } from "@/contexts/ListContext";
import { useBottomNav } from "@/contexts/BottomNavContext";
import ListCard from "@/components/card/ListCard";
import Pagination from "@/components/pagination/Pagination";
import FilterButton from "@/components/buttons/FilterButton";
import SortButton from "@/components/buttons/SortButton";
import DirectoryFilterDropdown from "@/components/filterDropdown/DirectoryFilterDropdown";

type User = {
  id: number;
  name: string;
  list_name: string;
  vote_start_date: number;
  list_type: string;
};

const IndividualList = () => {
  const params = useParams();
  const userId = Number(params?.userid);
  const { lists } = useListContext();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { isBottomNavOpen } = useBottomNav();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const listContainerRef = useRef<HTMLDivElement>(null);

  const users: Record<number, User> = {
    1: { id: 1, name: "kanon", list_name: "リスト①", vote_start_date: 20250204, list_type: "individual_list" },
    2: { id: 2, name: "katayanagi", list_name: "リスト②", vote_start_date: 20250204, list_type: "individual_list" },
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
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
    console.log(isDropdownVisible);
  };

  // **🔹 ページネーションの z-index を決定**
  const paginationZIndex = !isBottomNavOpen && !isDropdownVisible ? "z-40" : "z-20";

  return (
    <div className="p-5 overflow-auto relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{user.name}さんの個人リスト一覧</h1>
        <div className="flex gap-2 mb- justify-end relative z-10">
          <FilterButton onClick={toggleDropdown} />
          <SortButton />
        </div>
      </div>

      {/* ドロップダウンが表示されている場合のみ表示 */}
      {isDropdownVisible && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <DirectoryFilterDropdown />
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default IndividualList;
