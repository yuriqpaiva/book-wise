'use client';

import { useHydrateAtoms } from 'jotai/utils';
import { ExploreBookData } from '../page';
import { ReactNode } from 'react';
import { exploreBooksAtom } from '@/atoms/explore-book-atoms';

interface Props {
  booksFromServer: ExploreBookData[];
  children: ReactNode;
}

export function HydrateExploreBooksAtoms({ booksFromServer, children }: Props) {
  useHydrateAtoms([[exploreBooksAtom, booksFromServer]], {
    dangerouslyForceHydrate: true,
  });

  return children;
}
