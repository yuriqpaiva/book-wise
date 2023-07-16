'use client';

import { closeSidebarAtom } from '@/atoms/sidebar-atoms';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export function HandleSidebarClosing({ children }: Props) {
  const pathname = usePathname();
  const [, closeSidebar] = useAtom(closeSidebarAtom);

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);


  return <>{children}</>;
}
