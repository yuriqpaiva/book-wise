'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { ExploreBookData } from '@/app/(internal)/explore/page';
import { useSession } from 'next-auth/react';
import { SendRatingBox } from '@/app/(internal)/explore/components/SendRatingBox';
import { BookSummaryCard } from './BookSummaryCard';
import { RatingsWrapper } from './RatingsWrapper';
import { useBookDrawerRef } from '@/hooks/useBookDrawerRef';
import { RatingsHeader } from './RatingsHeader';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  book: ExploreBookData | null;
}

export function BookDrawer({ isOpen, onClose, book }: Props) {
  const { data, status } = useSession();
  const [ratingOpens, setRatingOpens] = useState<
    'rating-box' | 'sign-in-modal' | null
  >(null);

  function handleCloseRatingBox() {
    setRatingOpens(null);
  }

  function openRatingBox() {
    if (status !== 'authenticated') {
      setRatingOpens('sign-in-modal');
      return;
    }

    setRatingOpens('rating-box');
  }

  const drawerRef = useBookDrawerRef({ isOpen, onClose });

  return (
    <>
      <div
        className={`fixed inset-0 transition-all ease-in-out duration-200 ${
          isOpen ? 'bg-black opacity-60 z-10' : 'opacity-0 -z-10'
        }`}
      ></div>
      <div
        ref={drawerRef}
        className={`overflow-y-auto h-screen bg-gray-800 fixed right-0 top-0 transition-all duration-200 ease-in-out z-20 w-[660px] px-12 py-6
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <div className="flex justify-end">
          <button onClick={onClose}>
            <XMarkIcon className="w-8 h-8 text-gray-400 right-12" />
          </button>
        </div>

        <BookSummaryCard book={book} />

        <div className="mt-12 mb-10">
          <RatingsHeader onSendRatingOpen={openRatingBox} />

          {ratingOpens === 'rating-box' && data?.user && (
            <SendRatingBox
              user={data?.user}
              onClose={handleCloseRatingBox}
              onSubmit={() => {}}
            />
          )}

          {ratingOpens === 'sign-in-modal' && <div>Modal Opened</div>}

          <RatingsWrapper book={book} />
        </div>
      </div>
    </>
  );
}
