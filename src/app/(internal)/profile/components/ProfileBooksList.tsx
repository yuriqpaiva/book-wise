'use client';

import { ProfileBookCard } from '@/components/ProfileBookCard';
import { SearchInput } from '@/components/SearchInput';
import { RatingWithBook } from '../page';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  ratings: RatingWithBook[];
}

export function ProfileBooksList({ ratings }: Props) {
  const [currentRatings, setCurrentRatings] = useState(ratings);
  const { data: userData } = useSession();

  const filterQueryRef = useRef<HTMLInputElement>(null);

  async function handleSearch() {
    const params = new URLSearchParams();
    params.append('filter', filterQueryRef.current?.value ?? '');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/books/last-ratings/${
        userData?.user.id
      }?${params.toString()}`
    );
    const data = (await response.json()) as RatingWithBook[];

    setCurrentRatings(data);
  }

  return (
    <>
      <SearchInput
        ref={filterQueryRef}
        placeholder="Buscar livro avaliado"
        onTimeout={handleSearch}
      />

      <div className="mt-8 flex flex-col gap-6 pb-10">
        {currentRatings.map((rating) => (
          <ProfileBookCard key={rating.id} {...rating} />
        ))}
      </div>
    </>
  );
}
