"use client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedName: string;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedName,
}: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      // 型キャストを使って FocusableElement として扱う
      leastDestructiveRef={cancelRef as React.RefObject<HTMLElement>} // 型キャストを行う
      onClose={onClose}
    >
      <AlertDialogOverlay className="fixed inset-0 flex items-center justify-center bg-black/50">
        <AlertDialogContent
          className="text-center max-w-md mx-auto flex flex-col items-center justify-center 
                     !absolute !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2"
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            削除確認
          </AlertDialogHeader>
          <p>「{selectedName}」</p>
          <AlertDialogBody>削除しますか？</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteConfirmModal;
