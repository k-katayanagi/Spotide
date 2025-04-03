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
  Checkbox,
  VStack,
  Flex,
} from "@chakra-ui/react";

const defaultFields = [
  { key: "station", label: "駅" },
  { key: "google_rating", label: "Google評価" },
  { key: "custom_rating", label: "カスタム評価" },
  { key: "address", label: "住所" },
  { key: "time_to_station", label: "駅からの所要時間" },
  { key: "business_hours", label: "営業時間" },
  { key: "regular_holiday", label: "定休日" },
  { key: "time_from_nearest_station", label: "最寄り駅からの時間" },
  { key: "category", label: "カテゴリ" },
  { key: "sub_category", label: "サブカテゴリ" },
  { key: "list_participants", label: "登録者" },
  { key: "created_at", label: "登録日" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedFields: string[];
  setSelectedFields: (fields: string[]) => void;
}

const ViewLabelSettingModal = ({
  isOpen,
  onClose,
  selectedFields,
  setSelectedFields,
}: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedFields);

  const handleToggle = (key: string) => {
    setTempSelected((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleSave = () => {
    setSelectedFields(tempSelected);
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef as React.RefObject<HTMLElement>}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>表示ラベル設定</AlertDialogHeader>
          <AlertDialogBody>
            <VStack align="start" spacing={2}>
              {defaultFields.map((field) => (
                <Checkbox
                  key={field.key}
                  isChecked={tempSelected.includes(field.key)}
                  onChange={() => handleToggle(field.key)}
                >
                  {field.label}
                </Checkbox>
              ))}
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Flex justify="center" w="full" gap={{ base: 2, md: 4 }}>
              <Button
                onClick={onClose}
                ref={cancelRef}
                size={{ base: "md", md: "lg" }}
                borderRadius="full"
              >
                閉じる
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSave}
                size={{ base: "md", md: "lg" }}
                borderRadius="full"
              >
                設定
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ViewLabelSettingModal;
