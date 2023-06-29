import Image from 'next/image';
import { RatingStars } from './RatingStars';
import { Book } from '@prisma/client';

interface BookWithAverageRate extends Book {
  average_rate: number;
  read: boolean;
}

interface Props {
  book: BookWithAverageRate;
}

export function ExploreBookCard({ book }: Props) {
  return (
    <div className="relative w-full px-5 py-4 bg-gray-700 rounded-lg flex gap-5">
      <Image src={book.cover_url} width={108} height={152} alt="" />
      <div className="flex flex-col justify-between">
        <div>
          <strong className="font-semibold inline-block w-full">
            {book.name}
          </strong>
          <span className="text-sm text-gray-400">{book.author}</span>
        </div>
        <RatingStars rate={book.average_rate} />
      </div>
      {book.read && (
        <div className="absolute right-0 bottom-0 py-1 px-3 bg-green-300 flex justify-center items-center rounded-br-lg">
          <span className="text-green-100 text-xs uppercase">Lido</span>
        </div>
      )}
    </div>
  );
}
