'use client';

import Button from '@components/Button';
import useNavigation from '@/hooks/useNavigation';

interface Props {
  className?: string;
}

const IconListCreatePlusButton = ({ className }: Props) => {
  const { handleNavigateTo } = useNavigation();
  return (
    <Button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium text-neutral-50 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-400 hover:via-pink-500 hover:to-pink-600 hover:shadow-2xl transform hover:scale-102 mt-5 ${className}`}
      style={{ width: '50px', height: '50px' }}
      onClick={() => handleNavigateTo('/')}
      text={<>+</>}
    />
  );
};

export default IconListCreatePlusButton;
