'use client';

import { queryClient } from '@/lib/query-client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
