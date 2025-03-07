"use client";

import { useState, useRef } from "react";
import { testParticipants } from "../individual_list/testlistdata";
import { TParticipantingUser } from "@/types/UserTypes ";
import EditButton from "@/components/buttons/EditButton ";
import DeleteButton from "@/components/buttons/DeleteButton";
import DetailButton from "@/components/buttons/DetailButton";
import UserAddButton from "@/components/buttons/UserAddButton";
import Pagination from "@/components/pagination/Pagination";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import { useDisclosure, useToast } from "@chakra-ui/react";

const ParticipatingUsersList = () => {
  const [displayUserNames, setDisplayUserNames] =
    useState<TParticipantingUser[]>(testParticipants);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedUser, setSelectedUser] = useState<TParticipantingUser | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast(); // ✅ useToast を定義

  // const addUser = () => {
  //   const newUser: TParticipantingUser = {
  //     participant_id: Date.now(),
  //     participant_name: "新規ユーザー",
  //   };
  //   setDisplayUserNames((prev) => [...prev, newUser]);
  // };

  const editUser = (id: number) => {
    const newName = prompt("新しい名前を入力してください:");
    if (newName) {
      setDisplayUserNames((prev) =>
        prev.map((user) =>
          user.participant_id === id
            ? { ...user, participant_name: newName }
            : user
        )
      );
    }
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
      setSelectedUser(null); // ✅ selectedUser をリセット
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
    <div className="max-w-7xl mx-auto">
      <h1 className="font-bold">共有ユーザー一覧</h1>
      <div className="mb-5 flex justify-end">
        <UserAddButton />
      </div>
      <div className="w-full h-[400px] p-4 border border-orange-500 rounded-lg bg-gradient-to-br from-orange-200 to-orange-300 flex flex-col gap-y-2">
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
