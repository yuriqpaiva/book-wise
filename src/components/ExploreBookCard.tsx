import Image from 'next/image';
import { RatingStars } from './RatingStars';
import { Book } from '@prisma/client';

interface Props {
  book: Book;
}

export function ExploreBookCard({ book }: Props) {
  return (
    <div className="w-full px-5 py-4 bg-gray-700 rounded-lg flex gap-5">
      <Image
        src={book.cover_url}
        width={108}
        height={152}
        alt=""
      />
      <div className="flex flex-col justify-between">
        <div>
          <strong className='font-semibold inline-block w-full'>{book.name}</strong>
          <span className='text-sm text-gray-400'>{book.author}</span>
        </div>
        <RatingStars rate={3} />
      </div>
    </div>
  );
}
