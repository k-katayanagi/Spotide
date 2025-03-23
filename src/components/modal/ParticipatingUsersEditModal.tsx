import { useEffect, useState, useRef } from "react";
import { TParticipantingUser } from "@/types/UserTypes ";
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (username: string, password: string) => void;
  selectedUser: TParticipantingUser | null;
}

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

const ParticipatingUsersEditModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedUser,
}: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // ✅ モーダルが開くたびに `username` をセット
  const [username, setUsername] = useState(
    selectedUser?.participant_name || ""
  );
  const [password, setPassword] = useState(selectedUser?.password || "");

  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.participant_name);
      setPassword(selectedUser.password);
    }
  }, [selectedUser, isOpen]);

  const handleSave = () => {
    onConfirm(username, password);
    onClose();
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
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
            ユーザー情報変更
          </AlertDialogHeader>

          <AlertDialogBody>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-left mb-2 text-lg"
              >
                ユーザー名
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                新しいパスワード（任意）
              </label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                onClick={handleSave}
                size="lg"
                borderRadius="full"
              >
                保存
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ParticipatingUsersEditModal;
