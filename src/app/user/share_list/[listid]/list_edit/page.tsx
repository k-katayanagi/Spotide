'use client';

import { useSession } from 'next-auth/react';
import ListEdit from '@/app/user/list_edit/ListEdit';
import ListEditGuest from '@/app/user/list_edit/ListEditGuest';


const ShareListEdit = () => {
  const { data: session, status } = useSession();
  console.log('Session:', session);
  console.log('Status:', status);



  // セッションが読み込み中の場合は何も表示しない
  if (status === 'loading') return null;


  // セッションがない場合、ゲスト用コンポーネントを表示
  if (!session) {
    return <ListEditGuest/>;
  }

  // セッションがある場合、通常のリスト編集コンポーネントを表示
  return <ListEdit />;
};

export default ShareListEdit;
