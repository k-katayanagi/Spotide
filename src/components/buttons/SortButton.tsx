'use client';

import Button from '@components/Button';
import useNavigation from "@/hooks/useNavigation";

interface Props {
    className?: string; 
}

const SortButton = ({ className }: Props) => {
  const { handleNavigateTo } = useNavigation();
  return (
    <Button
      className={`items-center justify-center mt-5 text-black ${className}`}
      style={{ width: '50px', height: '50px' }}
      onClick={() => handleNavigateTo('/')}
      text={
        <>
          ↓↑三
        </>
      }
    />
  );
};

export default SortButton;
