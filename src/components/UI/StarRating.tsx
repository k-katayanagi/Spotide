"use client";

import { IconButton, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const StarRating = ({
  count = 5, // デフォルトを 5 に設定
  value,
  onChange,
}: {
  count?: number;
  value: number;
  onChange: (val: number) => void;
}) => {
  return (
    <Flex>
      {[...Array(count)].map((_, index) => {
        const star = index + 1;
        return (
          <IconButton
            key={star}
            aria-label={`${star} stars`}
            icon={<StarIcon boxSize={8} />}
            color={star <= value ? "yellow.200" : "gray.400"}
            bg="transparent"
            variant="ghost"
            _hover={{ color: "yellow.500" }}
            onClick={() => onChange(star === value ? 0 : star)}
          />
        );
      })}
    </Flex>
  );
};

export default StarRating;
