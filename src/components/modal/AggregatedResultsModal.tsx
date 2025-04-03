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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AggregatedResultsModal = ({ isOpen, onClose }: Props) => {
  // 仮の投票データ
  const results = [
    { label: '○○', votes: 1, isSelected: false },
    { label: '○○', votes: 2, isSelected: false },
    { label: '○○', votes: 5, isSelected: true },
  ];

  const paddingTop = useBreakpointValue({
    base: '2rem',
    sm: '6rem',
  });
  const cancelRef = useRef<HTMLButtonElement>(null);
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
            {results.map((result, index) => (
              <Flex key={index} justify="space-between" align="center" mb={2}>
                <Flex
                  align="center"
                  minW="50px"
                  justify="center"
                  alignItems="center"
                >
                  {result.isSelected && (
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
                  {result.label}
                </Text>
                <Text
                  fontSize="2xl"
                  minW="50px"
                  textAlign="left"
                  alignSelf="center"
                >
                  {result.votes}票
                </Text>
              </Flex>
            ))}

            <Flex justify="center" mt={6}>
              <Text fontSize="3xl" fontWeight="bold">
                ○○に
                <Text as="span" color="red.500">
                  決定
                </Text>
                しました!
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
