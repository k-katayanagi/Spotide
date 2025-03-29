"use client";

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css'; // スライダーのデフォルトスタイルを読み込む

const ImageSlider = ({ photoIds }: { photoIds: string[] }) => {
  const settings = {
    type: 'fade' as const, // 'fade' を明示的に指定
    rewind: true, // 最後のスライドから最初に戻る
    autoplay: false, // 自動再生
    perPage: 1, // 1ページあたりの表示枚数
    arrows: true, // 前後の矢印表示
    pagination: true, // ページネーション（ドットナビゲーション）
  };

  return (
    <Box>
      {photoIds && photoIds.length > 0 ? (
        <Splide options={settings}>
          {photoIds.map((photoId, index) => (
            <SplideSlide key={index}>
              <Image
                src={photoId}
                alt={`画像 ${index + 1}`}
                width={300} // 幅を変更
                height={160} // 高さを変更
                className="w-full h-[160px] object-cover rounded-lg"
                unoptimized
              />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <Text>画像がありません</Text>
      )}
    </Box>
  );
};

export default ImageSlider;
