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
  Icon,
} from '@chakra-ui/react';
import { FaCrown } from 'react-icons/fa';
import { useBreakpointValue } from '@chakra-ui/react';
import { useRef } from 'react';
import { ListItem } from '@/types/ListTypes';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  listItems: ListItem[];
}

const AggregatedResultsModal = ({ isOpen, onClose, listItems }: Props) => {
  const paddingTop = useBreakpointValue({
    base: '2rem',
    sm: '6rem',
  });
  const cancelRef = useRef<HTMLButtonElement>(null);
  // listItems が空でないかを確認し、最大投票数のアイテムを計算
  const maxVoteCount = Math.max(...listItems.map((item) => item.vote_cnt ?? 0));

  // 最大票数を持つアイテムをリストアップ
  const maxVoteItems = listItems.filter(
    (item) => item.vote_cnt === maxVoteCount,
  );

  if (maxVoteItems.length === 0) {
    return (
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef as React.RefObject<HTMLElement>}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>投票結果</AlertDialogHeader>
            <AlertDialogBody>
              <Text color="red.500">投票データがありません。</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>閉じる</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef as React.RefObject<HTMLElement>}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          maxWidth={{ base: '80%', md: '500px' }}
          minH={{ base: '30vh', md: '50vh' }}
          maxH="90vh"
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <AlertDialogHeader
            fontSize={{ base: 'lg', md: '2xl' }}
            fontWeight="bold"
          >
            投票結果
          </AlertDialogHeader>

          <AlertDialogBody paddingTop={paddingTop}>
            {listItems.map((result, index) => (
              <Flex key={index} justify="space-between" align="center" mb={2}>
                <Flex
                  align="center"
                  minW="50px"
                  justify="center"
                  alignItems="center"
                >
                  {maxVoteItems.includes(result) && (
                    <Icon as={FaCrown} boxSize={8} color="yellow.400" />
                  )}
                </Flex>
                <Text
                  fontSize="2xl"
                  flex="1"
                  textAlign="left"
                  alignSelf="center"
                  mr={3}
                >
                  {result.store_name}
                </Text>
                <Text
                  fontSize="2xl"
                  minW="50px"
                  textAlign="left"
                  alignSelf="center"
                >
                  {result.vote_cnt}票
                </Text>
              </Flex>
            ))}

            <Flex justify="center" mt={6}>
              <Text fontSize="3xl" fontWeight="bold">
                {maxVoteItems.length === 1 ? (
                  <>
                    {maxVoteItems[0].store_name}に
                    <Text as="span" color="red.500">
                      決定
                    </Text>
                    しました!
                  </>
                ) : (
                  <Text as="span" color="red.500">
                    同票です
                  </Text>
                )}
              </Text>
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Flex justify="center" w="full">
              <Button onClick={onClose} size="lg" borderRadius="full">
                閉じる
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AggregatedResultsModal;
