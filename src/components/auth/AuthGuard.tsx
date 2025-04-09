'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // 現在のURLを取得

  // ログイン不要なページ
  const publicRoutes = ['/login', '/registry'];
  const searchSpot = pathname.includes('spot_search');
  // '/view' とその動的IDにマッチする正規表現
  const isViewPage = /^\/view(\/.*)?$/.test(pathname); // `/view` とその動的IDにマッチする正規表現
  // '/user/share_list/{id}/list_edit' とその動的IDにマッチする正規表現
  const isShareListPage = /^\/user\/share_list\/\d+\/list_edit$/.test(pathname); // `/user/share_list/95/list_edit` のようなパスにマッチ
  // '/user/individual_list/{id}/list_edit' とその動的IDにマッチする正規表現
  const isIndividualListPage = /^\/user\/individual_list\/\d+\/list_edit$/.test(
    pathname,
  ); // `/user/individual_list/95/list_edit` のようなパスにマッチ
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
