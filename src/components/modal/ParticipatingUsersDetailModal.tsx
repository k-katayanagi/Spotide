'use client';

import { useRef } from 'react';
import { TParticipantingUser } from '@/types/UserTypes ';
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
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: TParticipantingUser | null;
  viewUrl: string;
}

const ParticipatingUsersDetailModal = ({
  isOpen,
  onClose,
  selectedUser,
  viewUrl,
}: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleCopyAll = () => {
    if (!selectedUser) return;

    const textToCopy = `URL: https://spotide.vercel.app/view/${viewUrl}\nユーザー名: ${selectedUser.participant_name}\n参加ID: ${selectedUser.participant_id}\n参加パスワード: ${selectedUser.password}`;
    navigator.clipboard.writeText(textToCopy);

    toast({
      title: 'コピーしました',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
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
          maxWidth={{ base: '90%', md: '500px' }} // スマホ時は90%、PC時は最大500px
          minH={{ base: '30vh', md: '50vh' }}
          maxH="90vh"
          p={{ base: 4, md: 6 }} // スマホ時は余白を小さく
          borderRadius="xl"
        >
          <AlertDialogHeader
            fontSize={{ base: 'lg', md: '2xl' }}
            fontWeight="bold"
          >
            ユーザー詳細
          </AlertDialogHeader>

          <AlertDialogBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            sx={{
              paddingInlineStart: { base: '5rem', md: '9rem' },
              paddingInlineEnd: { base: '8rem', md: '9rem' },
            }}
          >
            {selectedUser ? (
              <Flex
                direction="column"
                gap={{ base: 4, md: 6 }}
                w="100%"
                textAlign="center"
              >
                <Flex
                  direction="column"
                  align="center"
                  gap={{ base: 2, md: 4 }} // スマホ時は間隔を小さく
                  w="100%"
                  maxW={{ base: '400px', md: '500px' }} // スマホ時は小さく
                >
                  <Flex w="100%" justify="flex-start">
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      whiteSpace={{ base: 'normal', md: 'nowrap' }}
                      overflow="auto"
                      minWidth="120px"
                      textAlign="left"
                    >
                      URL:
                    </Text>
                    <Text fontSize="2xl" textAlign="left">
                      {viewUrl}
                    </Text>
                  </Flex>

                  <Flex w="100%" justify="flex-start">
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      minWidth="120px"
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
                      minWidth="120px"
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
                      minWidth="120px"
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
            <Flex justify="center" w="full" gap={{ base: 2, md: 4 }}>
              <Button
                ref={cancelRef}
                onClick={onClose}
                size={{ base: 'md', md: 'lg' }}
                borderRadius="full"
              >
                閉じる
              </Button>
              <Button
                colorScheme="blue"
                leftIcon={<CopyIcon />}
                onClick={handleCopyAll}
                size={{ base: 'md', md: 'lg' }}
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
