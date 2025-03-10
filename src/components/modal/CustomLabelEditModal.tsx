"use client";

import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Textarea,
  Text,
  Flex,
} from "@chakra-ui/react";
import StarRating from "../UI/StarRating";

interface Props {
  selectedName: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (memo: string, customRating: number) => void;
}

const CustomLabelEditModal = ({ isOpen, onClose, selectedName }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [memo, setMemo] = useState<string>("");
  const [customRating, setCustomRating] = useState<number>(0);

  // const handleSave = () => {
  //   onSave(memo, customRating);
  //   onClose();
  // };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as React.RefObject<HTMLElement>}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {selectedName}のカスタムラベル設定
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text fontSize="lg" fontWeight="medium" mb={2}>
              メモ
            </Text>
            <Textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="メモを入力してください..."
              size="md"
              mb={4}
            />
            <Text fontSize="lg" fontWeight="medium" mb={2}>
              カスタム評価
            </Text>
            <StarRating value={customRating} onChange={setCustomRating} />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Flex justify="center" w="full" gap={{ base: 2, md: 4 }}>
              <Button
                ref={cancelRef}
                onClick={onClose}
                size={{ base: "md", md: "lg" }}
                borderRadius="full"
              >
                閉じる
              </Button>
              <Button
                colorScheme="blue"
                size={{ base: "md", md: "lg" }}
                borderRadius="full"
              >
                {/* onClick={handleSave}  */}
                設定
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CustomLabelEditModal;
