"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSearchSpotContext } from "@/contexts/SearchSpotContext";
import { useBottomNav } from "@/contexts/BottomNavContext";
import Pagination from "@/components/pagination/Pagination";
import SortButton from "@/components/buttons/SortButton";
import { Spot } from "@/types/ListTypes";
import SearchSpotCard from "@/components/card/SearchSpotCard";
import SpotSearchFilterDropdown from "@/components/filterDropdown/SpotSearchFilterDropdown";
import SpotSearchSortDropdown from "@/components/sortDropdown/SpotSearchSortDropdown";
import { IconButton } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import InputBox from "@/components/InputBox";
import MenuBar from "@/components/Menu/MenuBar";
import useListType from "@/hooks/useListType";
import axios from "axios";

const SpotSearch = () => {
  const params = useParams();
  const { userid, listid } = params;
  const listType = useListType();
  const { searchSpots, setSearchSpots, filteredSpots } = useSearchSpotContext();
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(""); // 検索キーワードを管理する状態
  const { isBottomNavOpen } = useBottomNav();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  //   const [selectedSearchSpot, setSelectedSearchSpot] = useState<Spot | null>(
  //     null
  //   );
  //   const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const listContainerRef = useRef<HTMLDivElement>(null);

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

  // useEffect(() => {
  //   const fetchSpots = async () => {
  //     try {
  //       const response = await axios.get("/api/spotSearch?query=カフェ"); // ★ 検索ワードを適宜変更
  //       setSearchSpots(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch spots:", error);
  //     }
  //   };

  //   fetchSpots();
  // }, [setSearchSpots]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSearchSpot = searchSpots.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(searchSpots.length / itemsPerPage);

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

  const handleAddListItem = (spot: Spot) => {
    toast({
      title: `"${spot.store_name}" を追加しました`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };


  // 検索処理
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchKeyword.trim()) {
      toast({
        title: "検索キーワードが入力されていません。",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `/api/spotSearch?query=${encodeURIComponent(searchKeyword)}`
      );

      console.log(response.data.results)
      if (response.data.results && response.data.results.length > 0) {
        setSearchSpots(response.data.results); // 検索結果を context にセット
        toast({
          title: "検索が完了しました。",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "該当するスポットが見つかりませんでした。",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error(
        "検索に失敗しました:",
        error.response ? error.response.data : error.message
      );
      toast({
        title: "検索に失敗しました。",
        description: error.response?.data?.error || "ネットワークエラー",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
      toggleFilterDropdown(); // フィルターメニューを閉じる
    }
  };

  const paginationZIndex = !isBottomNavOpen && !isFilter ? "z-40" : "z-20";
  return (
    <div className="p-3 overflow-auto relative">
      <div className="flex items-center justify-between mb-5 w-full">
        <div className="flex-1 flex items-end justify-center gap-2">
          <InputBox
            placeholder="検索するキーワードを入力"
            className="border border-gray-400 rounded-md p-2 w-[300px] h-10 sm:w-[400px] sm:h-12 relative"
            onClick={toggleFilterDropdown}
            showImage={true}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-5">
          <SortButton onClick={toggleSortDropdown} disabled={isFilter} />
          <IconButton
            icon={<HamburgerIcon boxSize={7} />}
            variant="unstyled"
            aria-label="メニュー"
            className="flex items-center justify-center text-black w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
            onClick={toggleMenuDropdown}
          />
        </div>
      </div>

      {isFilter && (
        <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-[1024px]">
          <SpotSearchFilterDropdown handleSearch={handleSearch} />
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
        className="overflow-auto h-[65vh] p-2 border border-[#FF5722] rounded-lg  bg-gradient-to-br from-[#FFE0B2] to-[#FFCC80]
                  scrollbar-thin scrollbar-thumb-[#FF5722] scrollbar-track-[#FFE0B2]"
        ref={listContainerRef}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentSearchSpot.map((Item) => (
            <SearchSpotCard
              key={Item.id}
              SearchSpot={Item}
              onAdd={() => handleAddListItem(Item)}
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
