'use client';

import { useState } from 'react';
import { Box, Input, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { List } from '@/types/ListTypes';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  list: List;
}

const ImageUploader = ({ onImageUpload, list }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  // ファイル選択時の処理
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('list_id', list.list_id.toString()); // list_id を送る

 
    const res = await fetch('/api/imageUpload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data?.url) {
      setPreview(data.url); 
      onImageUpload(data.url); 
    } else {
      alert('アップロードに失敗しました');
    }
  };

  return (
    <Box className="my-2">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <Box mt={2}>
          <Text fontSize="sm" color="gray.500">
            プレビュー:
          </Text>
          <Image
            src={preview}
            alt="プレビュー"
            width={300}
            height={200}
            className="rounded-lg object-cover"
            unoptimized
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
