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
  onConfirm: (
    username: string,
    password: string,
    listId: number | null
  ) => void;
  selectedUser: TParticipantingUser | null;
  listId: number | null;
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
  listId,
}: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // モーダルが開くたびに `username` と `password` をセット
  const [username, setUsername] = useState(
    selectedUser?.participant_name || ""
  );
  const [password, setPassword] = useState(selectedUser?.password || "");

  useEffect(() => {
    if (isOpen && selectedUser) {
      console.log("Opening modal with selectedUser:", selectedUser);  // selectedUserが正しいか確認
      setUsername(selectedUser.participant_name);
      setPassword(selectedUser.password);
    }
  }, [isOpen, selectedUser]);
  
  
  

  const handleSave = () => {
    onConfirm(username, password, listId);
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
        <AlertDialogContent maxWidth={{ base: "80%", md: "500px" }}>
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
                disabled={selectedUser?.is_guest === false} // isGuestがfalseなら無効
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
