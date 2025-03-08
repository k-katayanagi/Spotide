"use client";

import { useRef } from "react";
import { TParticipantingUser } from "@/types/UserTypes ";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: TParticipantingUser | null;
}

const ParticipatingUsersDetailModal = ({
  isOpen,
  onClose,
  selectedUser,
}: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleCopyAll = () => {
    if (!selectedUser) return;

    const textToCopy = `ユーザー名: ${selectedUser.participant_name}\n参加ID: ${selectedUser.participant_id}\n参加パスワード: ${selectedUser.password}`;

    navigator.clipboard.writeText(textToCopy);

    toast({
      title: "コピーしました",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as React.RefObject<HTMLElement>}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          maxWidth="500px"
          minH="50vh" //最低50%の高さを確保
          maxH="90vh"
          p={6}
          borderRadius="xl"
        >
          <AlertDialogHeader fontSize="2xl" fontWeight="bold">
            ユーザー詳細
          </AlertDialogHeader>

          <AlertDialogBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
          >
            {selectedUser ? (
              <Flex direction="column" gap={6} w="100%" textAlign="center">
                <Flex
                  direction="column"
                  align="center"
                  gap={4}
                  w="100%"
                  maxW="400px"
                >
                  <Flex w="100%" justify="flex-start">
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      minWidth="140px"
                      textAlign="left"
                    >
                      ユーザー名:
                    </Text>
                    <Text fontSize="2xl" textAlign="left">
                      {selectedUser.participant_name}
                    </Text>
                  </Flex>

                  <Flex w="100%" justify="flex-start">
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      minWidth="140px"
                      textAlign="left"
                    >
                      参加ID:
                    </Text>
                    <Text fontSize="2xl" textAlign="left">
                      {selectedUser.participant_id}
                    </Text>
                  </Flex>

                  <Flex w="100%" justify="flex-start">
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      minWidth="140px"
                      textAlign="left"
                    >
                      参加パスワード:
                    </Text>
                    <Text fontSize="2xl" textAlign="left">
                      {selectedUser.password}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <Text fontSize="xl" color="gray.500">
                データがありません。
              </Text>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Flex justify="center" w="full" gap={4}>
              <Button
                ref={cancelRef}
                onClick={onClose}
                size="lg"
                borderRadius="full"
              >
                閉じる
              </Button>
              <Button
                colorScheme="blue"
                leftIcon={<CopyIcon />}
                onClick={handleCopyAll}
                size="lg"
                borderRadius="full"
              >
                コピーする
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ParticipatingUsersDetailModal;
