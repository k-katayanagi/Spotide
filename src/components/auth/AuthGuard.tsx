'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // 現在のURLを取得

  // ログイン不要なページ
  const publicRoutes = ['/','/login', '/registry'];
  const searchSpot = pathname.includes('spot_search');
  const isViewPage = /^\/view(\/.*)?$/.test(pathname);
  const isShareListPage = /^\/user\/share_list\/\d+\/list_edit$/.test(pathname);
  const isIndividualListPage = /^\/user\/individual_list\/\d+\/list_edit$/.test(
    pathname,
  );
  useEffect(() => {
    if (status === 'loading') return;

    const isPublicPage = publicRoutes.includes(pathname);

    if (
      !session &&
      !isPublicPage &&
      !isViewPage &&
      !isShareListPage &&
      !isIndividualListPage &&
      !searchSpot
    ) {
      router.push('/login');
    }

    if (session && isPublicPage) {
      router.push('/user/mypage');
    }
  }, [session, status, router, pathname]);

  if (status === 'loading') return <p>Loading...</p>;
  if (
    !session &&
    !publicRoutes.includes(pathname) &&
    !isViewPage &&
    !isShareListPage &&
    !isIndividualListPage &&
    !searchSpot
  )
    return null;

  return <>{children}</>;
};

export default AuthGuard;
