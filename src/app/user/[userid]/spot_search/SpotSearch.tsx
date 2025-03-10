"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSearchSpotContext } from "@/contexts/SearchSpotContext";
import { useBottomNav } from "@/contexts/BottomNavContext";
import Pagination from "@/components/pagination/Pagination";
import FilterButton from "@/components/buttons/FilterButton";
import SortButton from "@/components/buttons/SortButton";
import { Spot } from "@/types/ListTypes";
import SearchSpotCard from "@/components/card/SearchSpotCard";
import SpotSearchFilterDropdown from "@/components/filterDropdown/SpotSearchFilterDropdown";
import SpotSearchSortDropdown from "@/components/sortDropdown/SpotSearchSortDropdown";
import { IconButton } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import InputBox from "@/components/InputBox";
import SearchButton from "@/components/buttons/SearchButton";
import MenuBar from "@/components/Menu/MenuBar";
import useListType from "@/hooks/useListType";

const SpotSearch = () => {
  const params = useParams();
  const { userid, listid } = params;
  const listType = useListType();
  const { searchSpots, filteredSpots } = useSearchSpotContext();
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const { isBottomNavOpen } = useBottomNav();
  //   const [selectedSearchSpot, setSelectedSearchSpot] = useState<Spot | null>(
  //     null
  //   );
  //   const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [displaySearchSpot, setDisplaySearchSpot] =
    useState<Spot[]>(searchSpots);

  const menuItems = [
    {
      label: "共有ユーザー設定",
      url: `/user/${userid}/${listType}/${listid}/list_edit/participating_users_list`,
    },
    {
      label: "編集リストに戻る",
      url: `/user/${userid}/${listType}/${listid}/list_edit`,
    },
  ];

  useEffect(() => {
    if (filteredSpots && filteredSpots.length > 0) {
      setDisplaySearchSpot(filteredSpots);
    } else {
      setDisplaySearchSpot(searchSpots);
    }
  }, [filteredSpots?.length ?? 0, searchSpots]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSearchSpot = displaySearchSpot.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(displaySearchSpot.length / itemsPerPage);

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

  const toggleMenuDropdown = () => {
    setIsMenu((prevState) => !prevState);
  };

  const handleAddListItem = () => {
    console.log("Add");
  };

  const paginationZIndex = !isBottomNavOpen && !isFilter ? "z-40" : "z-20";
  return (
    <div className="p-3 overflow-auto relative">
<div className="flex items-center justify-between mb-5 w-full">
  <div className="flex-1 flex items-end justify-center gap-2">
    <InputBox
      placeholder="検索するキーワードを入力"
      className="border border-gray-400 rounded-md p-2 w-[200px] h-10 sm:w-[300px] sm:h-12" // スマホ時に幅と高さを小さくする
    />
    <SearchButton className="sm:h-12 h-10 w-[50px] sm:w-[70px]" />  
  </div>

  <div className="flex items-center gap-2">
    <FilterButton onClick={toggleFilterDropdown} disabled={isSort}  className="sm:w-12 sm:h-12 w-8 h-8"/>
    <SortButton onClick={toggleSortDropdown} disabled={isFilter} />
    <IconButton
      icon={<HamburgerIcon boxSize={5} />}
      variant="unstyled"
      aria-label="メニュー"
      className="flex items-center justify-center text-black w-[25px] h-[25px] sm:w-[50px] sm:h-[50px]"
    />
  </div>
</div>

      {isFilter && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <SpotSearchFilterDropdown
            toggleFilterDropdown={toggleFilterDropdown}
          />
        </div>
      )}

      {isSort && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <SpotSearchSortDropdown
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

      {/* リスト部分 */}
      <div
        className="overflow-auto max-h-[60vh] p-2 border border-[#FF5722] rounded-lg  bg-gradient-to-br from-[#FFE0B2] to-[#FFCC80]
                  scrollbar-thin scrollbar-thumb-[#FF5722] scrollbar-track-[#FFE0B2]"
        ref={listContainerRef}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentSearchSpot.map((Item) => (
            <SearchSpotCard
              key={Item.item_id}
              SearchSpot={Item}
              onAdd={handleAddListItem}
            />
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

export default SpotSearch;
