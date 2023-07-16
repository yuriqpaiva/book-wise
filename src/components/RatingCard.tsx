import { Box } from './Box';
import Image from 'next/image';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { formatDistance } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';
import { useFormatDistanceDateFromNow } from '@/hooks/useFormatDistanceDateFromNow';

interface Props {
  user: {
    name: string;
    avatar_url: string;
  };
  rate: number;
  created_at: string;
  book: {
    name: string;
    author: string;
    summary: string;
    cover_url: string;
    total_pages: number;
    created_at: Date;
  };
}

export function RatingCard({ user, rate, created_at, book }: Props) {
  const formattedDistanceDate = useFormatDistanceDateFromNow(created_at);

  return (
    <Box className="max-w-[560px] bg-gray-700">
      <header className="flex justify-between">
        <div className="flex gap-4">
          <Image
            src={user.avatar_url}
            alt=""
            height={40}
            width={40}
            className="rounded-full object-cover"
          />
          <div>
            <strong className="block font-normal text-sm text-gray-200">
              {user.name}
            </strong>
            <div className="first-letter:capitalize">
              <span className="text-sm text-gray-400">
                {formattedDistanceDate}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: rate }).map((_, i) => (
            <StarIconSolid className="h-4 w-4 text-purple-100" key={i} />
          ))}
          {Array.from({ length: 5 - rate }).map((_, i) => (
            <StarIconOutline className="h-4 w-4 text-purple-100" key={i} />
          ))}
        </div>
      </header>

      <div className="mt-8 flex gap-5">
        <Image
          src={book.cover_url}
          alt=""
          width={108}
          height={152}
          className="object-cover"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold">{book.name}</h3>
            <span className="block text-gray-400 text-sm mb-5">
              {book.author}
            </span>
          </div>
          <p className="line-clamp-4 text-sm text-gray-300">{book.summary}</p>
        </div>
      </div>
    </Box>
  );
}
