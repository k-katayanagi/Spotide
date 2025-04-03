'use client';

import { useState } from 'react';
import ParticipationButton from '@/components/buttons/ParticipationButton';
import TopButton from '@/components/buttons/TopButton';
import GoogleParticipationButton from '@/components/buttons/GoogleParticipationButton';

interface ParticipationAuthProps {
  setIsAuthenticated: (value: boolean) => void;
}

const ParticipationAuth = ({ setIsAuthenticated }: ParticipationAuthProps) => {
  const [activeTab, setActiveTab] = useState('guest');
  const [username, setUsername] = useState('');
  const [participationId, setParticipationId] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [existingPassword, setExistingPassword] = useState('');

  // 仮の認証データ
  const mockGuestUser = {
    username: 'user',
    participationId: '123',
    password: '123',
  };

  const handleGuestSubmit = () => {
    if (
      username === mockGuestUser.username &&
      participationId === mockGuestUser.participationId &&
      password === mockGuestUser.password
    ) {
      setIsAuthenticated(true);
    } else {
      alert('認証失敗: ユーザー名、参加ID、またはパスワードが間違っています');
    }
  };

  const handleExistingSubmit = () => {
    if (userId === 'existingUser' && existingPassword === 'password123') {
      setIsAuthenticated(true);
    } else {
      alert('認証失敗: ユーザーIDまたはパスワードが間違っています');
    }
  };

  return (
    <div className="tabs mt-5 pb-10 bg-white shadow-lg w-[400px] max-w-[90%] sm:w-[700px] mx-auto">
      {/* タブボタン */}
      <div className="flex border border-gray-400 rounded-lg overflow-hidden">
        <button
          onClick={() => setActiveTab('guest')}
          className={`w-1/2 h-16 border-r border-gray-400 ${
            activeTab === 'guest'
              ? 'bg-[#FF5722] text-white border-[#FF5722]'
              : 'bg-gray-300 text-gray-600'
          } text-center text-xl sm:text-lg font-bold hover:opacity-75 cursor-pointer transition-all ease duration-200`}
        >
          ゲストユーザー
        </button>
        <button
          onClick={() => setActiveTab('existing')}
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
            value={participationId}
            onChange={(e) => setParticipationId(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md mb-5 text-lg"
          />

          <label className="text-lg font-medium">参加パスワード</label>
          <input
            type="password"
            placeholder="参加パスワードを入力してください"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
