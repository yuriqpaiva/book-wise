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
import { useAtom } from 'jotai';
import { toggleSignModalAtom } from '@/atoms/sign-in-modal-atoms';
import { SignInDialog } from '../SignInDialog';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ratingSchema = z.object({
  rate: z.number().int().min(1, { message: 'Campo obrigatório' }).max(5),
  description: z.string().min(1, { message: 'Campo obrigatório' }).max(450),
});

export type RatingSchemaData = z.infer<typeof ratingSchema>;

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

  const [, toggleSignInModal] = useAtom(toggleSignModalAtom);

  const methods = useForm<RatingSchemaData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rate: 0,
    },
  });

  async function handleSubmitRating(ratingData: RatingSchemaData) {
    const { rate, description } = ratingData;

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify({
          rate,
          description,
          book_id: book?.id,
          user_id: data?.user?.id,
        }),
      });

      if (response.status === 201) {
        handleCloseRatingBox();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCloseRatingBox() {
    setRatingOpens(null);
  }

  function openRatingBox() {
    if (status !== 'authenticated') {
      toggleSignInModal();
      return;
    }

    setRatingOpens('rating-box');
  }

  const [drawerRef, signInModalRef] = useBookDrawerRef({ isOpen, onClose });

  return (
    <>
      <div
        className={`fixed inset-0 transition-all ease-in-out duration-200 ${
          isOpen ? 'bg-black opacity-60 z-10' : 'opacity-0 -z-10'
        }`}
        onClick={onClose}
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
            <FormProvider {...methods}>
              <SendRatingBox
                user={data?.user}
                onClose={handleCloseRatingBox}
                onSubmit={methods.handleSubmit(handleSubmitRating)}
              />
            </FormProvider>
          )}

          <RatingsWrapper ratings={book?.ratings} />
        </div>
      </div>
      <SignInDialog ref={signInModalRef} />
    </>
  );
}
