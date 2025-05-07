'use client';

import { useState, useEffect } from 'react';
import Button from '@components/Button';
import useNavigation from '@/hooks/useNavigation';

interface Props {
  className?: string;
  listId: number | null;
  ownerParam? : boolean;
}

const IssueViewButton = ({ className, listId,ownerParam}: Props) => {
  const { handleNavigateTo } = useNavigation();
  const [viewUrl, setViewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUrlIssued, setIsUrlIssued] = useState(false); // URLが発行されたかどうか

  useEffect(() => {
    if (listId === null) {
      setIsLoading(false);
      return;
    }

    const fetchViewUrl = async () => {
      try {
        const res = await fetch(`/api/viewUrl?listId=${listId}`);
        const data = await res.json();
        console.log('レスポンス:', data); // レスポンス内容をログ出力

        if (res.ok) {
          setViewUrl(data.viewUrl);
          setIsUrlIssued(!!data.viewUrl); // URLが発行されているかチェック
        } else {
          console.error('エラー:', data.error);
        }
      } catch (error) {
        console.error('閲覧URLの取得に失敗しました', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchViewUrl();
  }, [listId]);

  const handleClick = async () => {
    if (listId === null) {
      console.error('リストIDが無効です');
      return;
    }

    console.log('viewUrl:', viewUrl); // viewUrlが正しく設定されているか確認

    // URLがまだ発行されていない場合
    if (!viewUrl && !isUrlIssued) {
      try {
        const res = await fetch(`/api/viewUrl`, {
          method: 'POST',
          body: JSON.stringify({ listId }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        console.log('POSTレスポンス:', data); // 発行したURLが正しく返ってきているか確認

        if (res.ok) {
          setViewUrl(data.viewUrl);
          setIsUrlIssued(true); // 発行されたことを記録
        } else {
          console.error('閲覧URLの発行に失敗しました', data.error);
        }
      } catch (error) {
        console.error('閲覧URLの発行に失敗しました', error);
      }
    } else {
      // URLが発行された場合、そのURLに遷移
      if (viewUrl) {
        console.log('遷移先URL:', viewUrl); // 遷移先のURLを確認

        // 遷移先を修正: view/uuid に遷移するように
        const uuid = viewUrl.split('/').pop(); // URLからUUIDを取り出す
        const correctedUrl = `/view/${uuid}${ownerParam ? '?auth=true' : ''}`;
        console.log('修正後の遷移先URL:', correctedUrl); // 修正後の遷移先URLを確認
        handleNavigateTo(correctedUrl); // 修正後のURLに遷移
      }
    }
  };

  return (
    <Button
      className={`group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full 
                 bg-white border-4 border-[#FF5722] px-9 font-medium text-black transition-all duration-300 
                 hover:bg-gradient-to-r hover:from-[#FF7043] hover:via-[#FF5722] hover:to-[#F4511E] 
                 hover:shadow-2xl transform hover:scale-[1.02] ${className}`}
      onClick={handleClick}
      disabled={isLoading || listId === null}
      text={
        isLoading
          ? '読み込み中...'
          : listId === null
            ? 'リストIDが無効'
            : viewUrl
              ? '👁 閲覧する'
              : '👁 招待URL発行'
      }
    />
  );
};

export default IssueViewButton;
