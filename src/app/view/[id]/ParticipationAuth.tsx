'use client';

import { useState } from 'react';
import ParticipationButton from '@/components/buttons/ParticipationButton';
import TopButton from '@/components/buttons/TopButton';
import GoogleParticipationButton from '@/components/buttons/GoogleParticipationButton';
import { useSession } from 'next-auth/react';

interface Props {
  onAuthSuccess: (id: number) => void;
}
const ParticipationAuth = ({ onAuthSuccess }: Props) => {
  const { data: session } = useSession(); // セッション情報を取得
  const [activeTab, setActiveTab] = useState('guest');
  const [username, setUsername] = useState('');
  const [guestParticipationId, setGuestParticipationId] = useState('');
  const [existingParticipationId, setExistingParticipationId] = useState('');
  const [guestpassword, setGuestPassword] = useState('');
  const [existingPassword, setExistingPassword] = useState('');


  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // 入力値をリセット
    setUsername('');
    setGuestParticipationId('');
    setExistingParticipationId('');
    setGuestPassword('');
    setExistingPassword('');
  }
  

  //ゲストユーザー認証
  const handleGuestSubmit = async () => {
    if (session?.user?.id) {
      alert('既存ユーザーです');
      return;
    }
    // 共通認証
    const commonResponse = await fetch('/api/check-participation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantId: Number(guestParticipationId),
        password:guestpassword,
        currentUserId: null, // ゲストなので userId は null
      }),
    });

    const commonData = await commonResponse.json();

    if (!commonData.isValid) {
      alert('認証失敗: パスワードかIDが間違っています。');
      return;
    }

    // ユーザー名入力されてたら更新
    if (username) {
      const response = await fetch('/api/update-participant-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: Number(guestParticipationId),
          participantName: username,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('ユーザー名が更新されました');
      }
    }
    onAuthSuccess(Number(guestParticipationId));
  };

  // 既存ユーザー認証
  const handleExistingSubmit = async () => {
    if (!session?.user?.id) {
      alert('ログイン情報が確認できません');
      return;
    }


    // 既存ユーザー確認
    const checkResponse = await fetch('/api/check-existing-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.user.id }),
    });

    const checkData = await checkResponse.json();

    if (!checkData.isExisting) {
      alert('登録がありません');
      return;
    }

    // 共通処理で participantId & password の認証
    console.log(existingParticipationId)
    const commonResponse = await fetch('/api/check-participation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantId: Number(existingParticipationId),
        password:existingPassword,
        currentUserId: session.user.id,
      }),
    });

    const commonData = await commonResponse.json();
    console.log('Check Participation Data:', commonData); // デバッグ用ログ

    if (!commonData.isValid) {
      alert('参加情報の認証に失敗しました');
      return;
    }

    // 通過したら更新（user_id を紐付け）
    const updateResponse = await fetch('/api/update-participant-user-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantId: Number(existingParticipationId),
        userId: session.user.id,
        userName:session.user.name,
        isGuest: false,
      }),
    });

    const updateData = await updateResponse.json();

    if (updateData.success) {
      onAuthSuccess(Number(existingParticipationId));
    } else {
      alert('参加者情報の更新に失敗しました');
    }
  };

  return (
    <div className="tabs mt-5 pb-10 bg-white shadow-lg w-[400px] max-w-[90%] sm:w-[700px] mx-auto">
      {/* タブボタン */}
      <div className="flex border border-gray-400 rounded-lg overflow-hidden">
        <button
           onClick={() => handleTabChange('guest')}
          className={`w-1/2 h-16 border-r border-gray-400 ${
            activeTab === 'guest'
              ? 'bg-[#FF5722] text-white border-[#FF5722]'
              : 'bg-gray-300 text-gray-600'
          } text-center text-xl sm:text-lg font-bold hover:opacity-75 cursor-pointer transition-all ease duration-200`}
        >
          ゲストユーザー
        </button>
        <button
         onClick={() => handleTabChange('existing')}
          className={`w-1/2 h-16 ${
            activeTab === 'existing'
              ? 'bg-[#FF5722] text-white border-[#FF5722]'
              : 'bg-gray-300 text-gray-600'
          } text-center text-xl sm:text-lg font-bold hover:opacity-75 cursor-pointer transition-all ease duration-200`}
        >
          既存ユーザー
        </button>
      </div>

      {/* ゲストユーザー認証 */}
      {activeTab === 'guest' && (
        <div className="p-12 sm:p-8">
          <h2 className="text-3xl sm:text-2xl font-semibold mb-8">
            ゲストユーザー認証
          </h2>

          <label className="text-lg font-medium">ユーザー名(任意)</label>
          <input
            type="text"
            placeholder="ユーザー名を入力してください"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md mb-5 text-lg"
          />

          <label className="text-lg font-medium">参加ID</label>
          <input
            type="text"
            placeholder="参加IDを入力してください"
            value={guestParticipationId}
            onChange={(e) => setGuestParticipationId(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md mb-5 text-lg"
          />

          <label className="text-lg font-medium">参加パスワード</label>
          <input
            type="password"
            placeholder="参加パスワードを入力してください"
            value={guestpassword}
            onChange={(e) =>setGuestPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md mb-5 text-lg"
          />

          <div className="flex flex-col items-center justify-center gap-6 mt-8">
            <ParticipationButton onClick={handleGuestSubmit} />
            <TopButton />
          </div>
        </div>
      )}

      {/* 既存ユーザー認証 */}
      {activeTab === 'existing' && (
        <div className="p-12 sm:p-8">
          <h2 className="text-3xl sm:text-2xl font-semibold mb-8">
            既存ユーザー認証
          </h2>
          <label className="text-lg font-medium">参加ID</label>
          <input
            type="text"
            placeholder="参加IDを入力してください"
            value={existingParticipationId}
            onChange={(e) => setExistingParticipationId(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md mb-5 text-lg"
          />

          <label className="text-lg font-medium">参加パスワード</label>
          <input
            type="password"
            placeholder="参加パスワードを入力してください"
            value={existingPassword}
            onChange={(e) => setExistingPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md mb-5 text-lg"
          />

          <div className="flex flex-col items-center justify-center gap-6 mt-8">
            <GoogleParticipationButton onClick={handleExistingSubmit} />
            <TopButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipationAuth;
