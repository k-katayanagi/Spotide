'use client';

import { useEffect, useState } from 'react';
import ListView from './ListView';
import ParticipationAuth from './ParticipationAuth';
import { useSearchParams } from 'next/navigation';

type AuthListItem = {
  listId: string;
  participantId: number;
};

const ListViewPage = () => {
  const searchParams = useSearchParams();
  const isOwner = searchParams.get('auth') === 'true';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [listId, setListId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const listIdMatch = pathname.match(/list(\d+)-/);

      if (listIdMatch) {
        setListId(listIdMatch[1]);
      }

      if (isOwner) {
        setIsAuthenticated(true);
        return; // ← 管理者ならこれ以上チェック不要
      }

      const storedAuthLists = localStorage.getItem('authLists');
      const authLists: AuthListItem[] = storedAuthLists
        ? JSON.parse(storedAuthLists)
        : [];

      if (listIdMatch?.[1]) {
        const matched = authLists.some(
          (item) => item.listId === listIdMatch[1],
        );
        setIsAuthenticated(matched);
      }
    }
  }, [isOwner]);

  const handleAuthSuccess = (participantId: number, listId: number) => {
    const stored = localStorage.getItem('authLists');
    const authData: AuthListItem[] = stored ? JSON.parse(stored) : [];
    const existingIndex = authData.findIndex(
      (item: AuthListItem) => item.listId === String(listId),
    );

    if (existingIndex !== -1) {
      authData[existingIndex].participantId = participantId;
    } else {
      authData.push({ listId: String(listId), participantId });
    }

    localStorage.setItem('authLists', JSON.stringify(authData));
    setIsAuthenticated(true);
  };

  return (
    <div className="relative">
      {!isAuthenticated ? (
        <ParticipationAuth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-white">
          <ListView GetListId={listId} isAdmin={isOwner}/>
        </div>
      )}
    </div>
  );
};

export default ListViewPage;
