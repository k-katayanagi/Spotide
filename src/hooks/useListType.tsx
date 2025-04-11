'use client';
import { usePathname } from 'next/navigation';

type ListType = 'individual_list' | 'share_list' | 'unknown';

const useListType = (): ListType => {
  const pathname = usePathname();

  if (pathname.includes('/individual_list/')) {
    return 'individual_list'; // 個人リスト
  } else if (pathname.includes('/share_list/')) {
    return 'share_list'; // 共有リスト
  } else {
    return 'unknown'; // 不明なリスト
  }
};

export default useListType;
