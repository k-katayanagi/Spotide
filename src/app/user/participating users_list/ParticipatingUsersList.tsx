'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { TParticipantingUser } from '@/types/UserTypes ';
import EditButton from '@/components/buttons/EditButton ';
import DeleteButton from '@/components/buttons/DeleteButton';
import DetailButton from '@/components/buttons/DetailButton';
import UserAddButton from '@/components/buttons/UserAddButton';
import Pagination from '@/components/pagination/Pagination';
import ParticipatingUsersAddModal from '@/components/modal/ParticipatingUsersAddModal';
import ParticipatingUsersEditModal from '@/components/modal/ParticipatingUsersEditModal';
import ParticipatingUsersDetailModal from '@/components/modal/ParticipatingUsersDetailModal';
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
import { IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import MenuBar from '@/components/Menu/MenuBar';
import { useDisclosure, useToast, Spinner } from '@chakra-ui/react';
import useListType from '@/hooks/useListType';

const ParticipatingUsersList = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [displayUserNames, setDisplayUserNames] = useState<
    TParticipantingUser[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const { listid } = params;
  const listId = params?.listid ? Number(params.listid) : null;
  const listType = useListType();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedUser, setSelectedUser] = useState<TParticipantingUser | null>(
    null,
  );
  const [viewUrl, setViewUrl] = useState<string>('未発行');

  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();

  const [isMenu, setIsMenu] = useState(false);
  const toast = useToast();
  const searchParams = useSearchParams();
  const votingStart = searchParams.get('votingStart') === 'true';

  const menuItems = [
    ...(!votingStart
      ? [
          {
            label: '場所を検索',
            url: `/user/${listType}/${listid}/list_edit/spot_search`,
          },
          {
            label: '編集リストに戻る',
            url: `/user/${listType}/${listid}/list_edit/`,
          },
        ]
      : []),
  ];

  const fetchParticipants = async () => {
    if (!listId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/participants?list_id=${listId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Participants:', data);
        setDisplayUserNames(data.data);
        setViewUrl(data.listUrl);
      } else {
        toast({
          title: 'データ取得に失敗しました',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        title: 'エラーが発生しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [listId]);

  const toggleMenuDropdown = () => {
    setIsMenu((prevState) => !prevState);
  };

  const handleUserAddClick = () => {
    onAddModalOpen();
  };

  const handleUserAdd = async (
    username: string,
    password: string,
    listId: number | null,
  ) => {
    if (!username || !password || !listId) {
      toast({
        title: '情報が不足しています',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    try {
      const response = await fetch('/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participant_name: username,
          password,
          list_id: listId,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Error response:', errorResult);
        throw new Error(errorResult.message || 'Unknown error occurred');
      }

      const result = await response.json();
      console.log(result);

      if (result) {
        setDisplayUserNames((prevUsers) => [
          ...prevUsers,
          {
            participant_id: result.data.participant_id,
            list_id: result.data.list_id,
            user_id: result.data.user_id,
            participant_name: username,
            password: result.data.password,
            is_guest: result.data.is_guest,
            created_at: result.data.created_at || new Date(),
            updated_at: result.data.updated_at || new Date(),
          } as TParticipantingUser,
        ]);

        toast({
          title: `"${username}" を追加しました！`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });

        // モーダルを閉じる
        onAddModalClose();
      } else {
        toast({
          title: 'ユーザーの追加に失敗しました',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      console.error('ユーザー追加エラー:', error);
      toast({
        title: 'ユーザー追加処理中にエラーが発生しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleUserEditClick = (user: TParticipantingUser) => {
    if (user) {
      setSelectedUser(user);
      onEditModalOpen();
    }
  };

  const handleUserEdit = async (
    editedUsername: string,
    editedPassword: string,
    listId: number | null,
  ) => {
    if (!selectedUser) return;

    try {
      const response = await fetch('/api/participants', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participant_id: selectedUser.participant_id,
          participant_name: editedUsername,
          password: editedPassword || null,
          list_id: listId,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Error response:', errorResult);
        throw new Error(errorResult.message || 'Unknown error occurred');
      }

      const result = await response.json();

      if (result) {
        setDisplayUserNames((prevUsers: TParticipantingUser[]) => {
          const updatedUsers = prevUsers.map((user) =>
            user.participant_id === result.data.participant_id
              ? {
                  ...user,
                  participant_name: result.data.participant_name,
                  password: result.data.password,
                  list_id: listId !== null ? listId : user.list_id,
                  updated_at: result.updated_at || new Date(),
                }
              : user,
          );
          console.log(updatedUsers);
          return updatedUsers;
        });

        toast({
          title: '情報を更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });

        setSelectedUser(null);
        onEditModalClose();
      }
    } catch (error) {
      console.error('更新エラー:', error);
      toast({
        title: '更新に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleDeleteClick = (user: TParticipantingUser) => {
    setSelectedUser(user);
    onDeleteModalOpen();
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch('/api/participants', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participant_id: selectedUser.participant_id }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error('Error response:', errorResult);
        throw new Error(errorResult.message || '削除処理に失敗しました');
      }

      setDisplayUserNames((prevUsers) =>
        prevUsers.filter(
          (user) => user.participant_id !== selectedUser.participant_id,
        ),
      );

      toast({
        title: `"${selectedUser.participant_name}" を削除しました`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      setSelectedUser(null);
      onDeleteModalClose();
    } catch (error) {
      console.error('削除エラー:', error);
      toast({
        title: '削除に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleUserDetailClick = (user: TParticipantingUser) => {
    setSelectedUser(user);
    onDetailModalOpen();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUserNames = displayUserNames.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(displayUserNames.length / itemsPerPage);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
            {!votingStart && (
              <IconButton
                icon={<HamburgerIcon boxSize={5} />}
                variant="unstyled"
                aria-label="メニュー"
                className="flex items-center justify-center text-black block"
                style={{ width: '50px', height: '50px' }}
                onClick={toggleMenuDropdown}
              />
            )}
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

      <div className="w-[90%] sm:w-[60%] h-[400px] p-4 border border-orange-500 rounded-lg bg-gradient-to-br from-orange-200 to-orange-300 flex flex-col gap-y-2 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="xl" />
          </div>
        ) : displayUserNames.length === 0 ? (
          <p className="text-center text-gray-600">参加者がいません</p>
        ) : (
          currentUserNames.map((user) => {
            const isCurrentUser = user.user_id === userId;

            return (
              <div
                key={user.participant_id}
                className="flex items-center gap-x-4 p-2 border border-orange-500 rounded-lg bg-white h-[60px]"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate">{user.participant_name}</p>
                </div>
                <div className="flex items-center gap-x-2 w-[200px]">
                  <EditButton
                    className="flex items-center justify-center h-[40px] w-[70px] sm:h-[45px] sm:w-[80px]"
                    onClick={() => handleUserEditClick(user)}
                  />
                  <DetailButton
                    className="flex items-center justify-center h-[40px] w-[70px] sm:h-[45px] sm:w-[80px]"
                    onClick={() => handleUserDetailClick(user)}
                  />
                  {!isCurrentUser && (
                    <DeleteButton
                      className="flex items-center justify-center h-[40px] w-[70px] sm:h-[45px] sm:w-[80px]"
                      onClick={() => handleDeleteClick(user)}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 削除確認モーダル */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onConfirm={handleDelete}
        selectedName={selectedUser?.participant_name || ''}
      />

      {/* ユーザー追加モーダル */}
      <ParticipatingUsersAddModal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onConfirm={handleUserAdd}
        listId={listId}
      />

      {/* ユーザー編集モーダル */}
      <ParticipatingUsersEditModal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        onConfirm={handleUserEdit}
        selectedUser={selectedUser || null}
        listId={listId}
      />

      {/* ユーザー詳細モーダル */}
      <ParticipatingUsersDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        selectedUser={selectedUser || null}
        viewUrl={viewUrl}
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
