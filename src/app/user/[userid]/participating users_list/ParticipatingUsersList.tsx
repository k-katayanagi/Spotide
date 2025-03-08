"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { testParticipants } from "../individual_list/testlistdata";
import { TParticipantingUser } from "@/types/UserTypes ";
import EditButton from "@/components/buttons/EditButton ";
import DeleteButton from "@/components/buttons/DeleteButton";
import DetailButton from "@/components/buttons/DetailButton";
import UserAddButton from "@/components/buttons/UserAddButton";
import Pagination from "@/components/pagination/Pagination";
import ParticipatingUsersAddModal from "@/components/modal/ParticipatingUsersAddModal";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import MenuBar from "@/components/Menu/MenuBar";
import { useDisclosure, useToast } from "@chakra-ui/react";
import useListType from "@/hooks/useListType";

const ParticipatingUsersList = () => {
  const [displayUserNames, setDisplayUserNames] =
    useState<TParticipantingUser[]>(testParticipants);
  const params = useParams();
  const { userid, listid } = params;
  const listType = useListType();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedUser, setSelectedUser] = useState<TParticipantingUser | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMenu, setIsMenu] = useState(false);
  const toast = useToast();

  const menuItems = [
    { label: "場所を検索", url: "/search" },
    {
      label: "共有ユーザー設定",
      url: `/user/${userid}/${listType}/${listid}/list_edit/participating_users_list`,
    },
    { label: "表示ラベル設定", url: "/settings/labels" },
    { label: "投票開始日設定", url: "/settings/voting" },
  ];

  const toggleMenuDropdown = () => {
    setIsMenu((prevState) => !prevState);
  };

  const handleUserAddClick = () => {
    onOpen();
  };

  const handleUserAdd = (username: string, password: string) => {
    console.log("ユーザー追加:", { username, password });
    // ユーザー追加処理をここに実装

    toast({
      title: `"${username}" を追加しました！`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleDeleteClick = (user: TParticipantingUser) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDelete = () => {
    if (selectedUser) {
      setDisplayUserNames((prevUsers) =>
        prevUsers.filter(
          (user) => user.participant_id !== selectedUser.participant_id
        )
      );
      toast({
        title: `"${selectedUser.participant_name}" を削除しました`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setSelectedUser(null);
      onClose();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUserNames = displayUserNames.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(displayUserNames.length / itemsPerPage);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-3 overflow-auto relative">
      <div className="flex items-center justify-between mb-5 w-full">
        <h1 className="text-2xl font-bold flex-1">共有ユーザー一覧</h1>

        <div className="flex items-center gap-2">
          <div>
            <UserAddButton onClick={handleUserAddClick} />
          </div>
          <div className="flex gap-2 items-center">
            <IconButton
              icon={<HamburgerIcon boxSize={5} />}
              variant="unstyled"
              aria-label="メニュー"
              className="flex items-center justify-center text-black block"
              style={{ width: "50px", height: "50px" }}
              onClick={toggleMenuDropdown}
            />
          </div>
        </div>

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
      </div>

      <div className="w-[80%] h-[400px] p-4 border border-orange-500 rounded-lg bg-gradient-to-br from-orange-200 to-orange-300 flex flex-col gap-y-2  mx-auto">
        {currentUserNames.length > 0 ? (
          currentUserNames.map((user) => (
            <div
              key={user.participant_id}
              className="flex items-center gap-x-4 p-2 border border-orange-500 rounded-lg bg-white h-[60px]"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate">{user.participant_name}</p>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <EditButton
                  className="flex items-center justify-center h-[45px] w-[50px] md:h-[40px] md:w-[90px] sm:h-[35px] sm:w-[80px] min-w-0 xs:h-[30px] xs:w-[70px]"
                  onClick={() => editUser(user.participant_id)}
                />
                <DetailButton className="flex items-center justify-center h-[45px] w-[50px] md:h-[40px] md:w-[90px] sm:h-[35px] sm:w-[80px] min-w-0 xs:h-[30px] xs:w-[70px]" />
                <DeleteButton
                  className="flex items-center justify-center h-[45px] w-[50px] md:h-[40px] md:w-[90px] sm:h-[35px] sm:w-[80px] min-w-0 xs:h-[30px] xs:w-[70px]"
                  onClick={() => handleDeleteClick(user)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">データなし</p>
        )}
      </div>

      {/* 削除確認モーダル */}
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDelete}
        selectedName={selectedUser?.participant_name || ""}
      />

      {/* ユーザー追加モーダル */}
      <ParticipatingUsersAddModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleUserAdd}
      />

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="mt-3 flex justify-center bg-white p-2">
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

export default ParticipatingUsersList;
