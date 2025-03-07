"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useListContext } from "@/contexts/ListContext";
import { useListItemContext } from "@/contexts/ListItemContext";
import { useBottomNav } from "@/contexts/BottomNavContext";
import Pagination from "@/components/pagination/Pagination";
import FilterButton from "@/components/buttons/FilterButton";
import SortButton from "@/components/buttons/SortButton";
import { ListItem } from "@/types/ListTypes";
import ListItemCard from "@/components/card/ListItemCard";
import IssueViewButton from "@/components/buttons/IssueViewButton";
import { motion } from "framer-motion";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import MenuBar from "@/components/Menu/MenuBar";

const ListEdit = () => {
  const params = useParams();
  const { lists, sortLists } = useListContext();
  const { listItems } = useListItemContext();
  const listId = params?.listid ? Number(params.listid) : null;
  const list = lists.find((i) => i.id === listId);
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const { isBottomNavOpen } = useBottomNav();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [displayListItems, setDisplayListItems] =
    useState<ListItem[]>(listItems);

  useEffect(() => {
    if (sortLists.length > 0) {
      setDisplayListItems(listItems);
    } else {
      setDisplayListItems(listItems);
    }
  }, [sortLists.length]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListItems = displayListItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(displayListItems.length / itemsPerPage);

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

  // 🆕 追加: メニューの開閉関数
  const toggleMenuDropdown = () => {
    setIsMenu((prevState) => !prevState);
  };

  const paginationZIndex = !isBottomNavOpen && !isFilter ? "z-40" : "z-20";

  return (
    <div className="p-3 overflow-auto relative">
      <div className="flex items-center justify-between mb-5 w-full">
        <h1 className="text-2xl font-bold flex-1">
          {list ? list.list_name : "リストが見つかりません"}
        </h1>

        <div className="flex items-center gap-2">
          <IssueViewButton />

          {/* フィルター & ソートボタンをアイコンと揃える */}
          <div className="flex gap-2 items-center">
            <FilterButton onClick={toggleFilterDropdown} disabled={isSort} />
            <SortButton onClick={toggleSortDropdown} disabled={isFilter} />
            <IconButton
              icon={<HamburgerIcon boxSize={5} />} // テキストと同じ高さにするため boxSize を調整
              variant="unstyled"
              aria-label="メニュー"
              className="flex items-center justify-center text-black block"
              style={{ width: "50px", height: "50px" }} // `FilterButton` と同じインラインスタイルを追加
              onClick={toggleMenuDropdown}
            />
          </div>
        </div>
      </div>

      {/*absoluteにしてリストの上に被せる */}
      {isMenu && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center">
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-xl 
                 hover:bg-gray-200 transition-all duration-200"
            onClick={toggleMenuDropdown}
          >
            <CloseIcon boxSize={5} />
          </button>

          <MenuBar onClick={toggleMenuDropdown} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white border border-orange-200 shadow-lg rounded-lg p-4 h-auto min-h-[320px] flex flex-col justify-between hover:shadow-xl transition-shadow"
      >
        {/* リスト部分 */}
        <div
          className="overflow-auto max-h-[60vh] p-2 border border-[#FF5722] rounded-lg  bg-gradient-to-br from-[#FFE0B2] to-[#FFCC80]
                scrollbar-thin scrollbar-thumb-[#FF5722] scrollbar-track-[#FFE0B2]"
          ref={listContainerRef}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentListItems.map((listItem) => (
              <ListItemCard key={listItem.item_id} listItem={listItem} />
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

export default ListEdit;
