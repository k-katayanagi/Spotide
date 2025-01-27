'use client';
import { useRouter } from 'next/navigation';

type NavigationHook = {
  handleNavigateTo: (path: string) => void;
};

const useNavigation = (): NavigationHook => {
  const router = useRouter();

  const handleNavigateTo = (path: string) => {
    router.push(path); // ページ遷移処理
  };

  return { handleNavigateTo };
};

export default useNavigation;
