'use client';

import { useEffect, useState } from 'react';
import ListView from './ListView';
import ParticipationAuth from './ParticipationAuth';

type AuthListItem = {
  listId: string;
  participantId: number;
};

const ListViewPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [listId, setListId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // URLからリストIDを抽出
      const pathname = window.location.pathname;
      const listIdMatch = pathname.match(/list(\d+)-/);

      if (listIdMatch) {
        setListId(listIdMatch[1]);
      }

      // ローカルストレージから認証状態を確認
      const storedAuthLists = localStorage.getItem('authLists');
      const authLists: AuthListItem[] = storedAuthLists
        ? JSON.parse(storedAuthLists)
        : [];

      if (listId) {
        // listIdが確定したタイミングで認証処理
        if (authLists.some((item: AuthListItem) => item.listId === listId)) {
          setIsAuthenticated(true); // 認証されたときに状態を更新
        }
      }
    }
  }, [listId]); // listIdが変わったタイミングで認証チェック

  const handleAuthSuccess = (participantId: number, listId: number) => {
    const stored = localStorage.getItem('authLists');
    const authData: AuthListItem[] = stored ? JSON.parse(stored) : [];
    // すでにその listId が存在する場合は上書き、それ以外は追加
    const existingIndex = authData.findIndex(
      (item: AuthListItem) => item.listId === String(listId),
    );

    if (existingIndex !== -1) {
      authData[existingIndex].participantId = participantId;
    } else {
      authData.push({ listId: String(listId), participantId });
    }

    localStorage.setItem('authLists', JSON.stringify(authData));
    setIsAuthenticated(true); // 認証後に状態を更新
  };

  return (
    <div className="relative">
      {!isAuthenticated ? (
        <ParticipationAuth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
          <ListView GetListId={listId} />
        </div>
      )}
    </div>
  );
};

export default ListViewPage;
