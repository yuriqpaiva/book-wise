import Image from 'next/image';
import { Box } from './Box';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Props {
  book: {
    name: string;
    author: string;
    summary: string;
    cover_url: string;
    total_pages: number;
    created_at: Date;
    averageRate: number;
  };
}

export function PopularBookCard({ book }: Props) {
  return (
    <Box className="flex gap-5">
      <Image
        src={book.cover_url}
        width={64}
        height={94}
        alt=""
      />
      <div className="flex flex-col justify-between">
        <div>
          <h4 className="font-semibold">{book.name}</h4>
          <span className="block text-gray-400 text-sm">{book.author}</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: book.averageRate }).map((_, i) => (
            <StarIconSolid className="h-4 w-4 text-purple-100" key={i} />
          ))}
          {Array.from({ length: 5 - book.averageRate }).map((_, i) => (
            <StarIconOutline className="h-4 w-4 text-purple-100" key={i} />
          ))}
        </div>
      </div>
    </Box>
  );
}
