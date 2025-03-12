"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // UUID 生成ライブラリ
import Button from "@components/Button";
import useNavigation from "@/hooks/useNavigation";

interface Props {
  className?: string;
  listId: number | null; // listId は null になる可能性がある
}

const IssueViewButton = ({ className, listId }: Props) => {
  const { handleNavigateTo } = useNavigation();
  const [viewUrl, setViewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //初回レンダリング時に listId をDBでチェック（仮で localStorage）
  useEffect(() => {
    if (listId === null) {
      setIsLoading(false);
      return;
    }

    const fetchViewUrl = async () => {
      try {
        // 本番では `/api/view-url?listId=${listId}` に `GET` する
        const storedData: Record<number, string> = JSON.parse(
          localStorage.getItem("viewUrls") || "{}"
        );

        if (storedData[listId]) {
          setViewUrl(`/view/${storedData[listId]}`);
        }
      } catch (error) {
        console.error("閲覧URLの取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchViewUrl();
  }, [listId]);

  const handleClick = async () => {
    if (listId === null) {
      console.error("リストIDが無効です");
      return;
    }

    if (!viewUrl) {
      try {
        // UUID を発行
        const newUuid = uuidv4();
        const generatedUrl = `/view/${newUuid}`;

        // 仮のDB (localStorage) に保存（本番では API に保存）
        const storedData: Record<number, string> = JSON.parse(
          localStorage.getItem("viewUrls") || "{}"
        );
        storedData[listId] = newUuid;
        localStorage.setItem("viewUrls", JSON.stringify(storedData));

        setViewUrl(generatedUrl);
      } catch (error) {
        console.error("閲覧URLの発行に失敗しました", error);
        return;
      }
    } else {
      // 発行済みなら URL へ移動
      handleNavigateTo(viewUrl);
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
          ? "読み込み中..."
          : listId === null
          ? "リストIDが無効"
          : viewUrl
          ? "閲覧する"
          : "閲覧URL発行"
      }
    />
  );
};

export default IssueViewButton;
