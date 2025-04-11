'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

const ImageSlider = ({ photoIds }: { photoIds: string[] }) => {
  const settings = {
    type: 'fade' as const,
    rewind: true,
    autoplay: false,
    perPage: 1,
    arrows: true,
    pagination: true,
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
                width={300}
                height={200}
                className="w-full h-[200px] object-cover rounded-lg"
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
