import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react";

// パスワード自動生成
const generatePassword = (length: number = 12): string => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (username: string, password: string) => void;
}

const ParticipatingUsersAddModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  };

  const handleAddUser = () => {
    onConfirm(username, password);
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as React.RefObject<HTMLElement>}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          maxWidth={{ base: "80%", md: "500px" }} // スマホ時は90%、PC時は最大500px
          minH={{ base: "30vh", md: "50vh" }} 
          maxH="90vh"
          p={{ base: 4, md: 6 }} // スマホ時は余白を小さく
          borderRadius="xl"
        >
          <AlertDialogHeader
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="bold"
          >
            ユーザー追加
          </AlertDialogHeader>

          <AlertDialogBody>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-left mb-2 text-lg"
              >
                ユーザー名を入力してください
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ユーザー名"
                size="lg"
                h="55px"
                fontSize="xl"
                w="full"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-left mb-2 text-lg"
              >
                パスワードを入力してください
              </label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                size="lg"
                h="55px"
                fontSize="xl"
                w="full"
                type="text"
              />
            </div>

            <Flex justify="end">
              <Button
                onClick={handleGeneratePassword}
                colorScheme="blue"
                variant="solid"
                size="lg"
                borderRadius="full"
              >
                パスワード自動生成
              </Button>
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Flex justify="center" w="full" gap={4}>
              <Button
                ref={cancelRef}
                onClick={onClose}
                size="lg"
                borderRadius="full"
              >
                キャンセル
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleAddUser}
                size="lg"
                borderRadius="full"
              >
                追加
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ParticipatingUsersAddModal;
