import Image from 'next/image';
import { Box } from './Box';
import { RatingStars } from './RatingStars';
import { useFormatDistanceDateFromNow } from '@/hooks/useFormatDistanceDateFromNow';

interface Props {
  description: string;
  rate: number;
  created_at: string;
  book: {
    id: string;
    name: string;
    author: string;
    summary: string;
    cover_url: string;
    total_pages: number;
    created_at: string;
  };
}

export function ProfileBookCard({
  book,
  rate,
  description,
  created_at,
}: Props) {
  const formattedDistanceDate = useFormatDistanceDateFromNow(created_at);

  return (
    <div>
      <div className="first-letter:capitalize mb-2">
        <span className="text-sm text-gray-300 block">
          {formattedDistanceDate}
        </span>
      </div>
      <Box className="bg-gray-700 hover:bg-brand-600 hover:ring-2 hover:ring-gray-500">
        <div className="flex gap-6 mb-6">
          <div>
            <Image
              src={book.cover_url}
              width={98}
              height={134}
              alt=""
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-semibold">{book.name}</h4>
              <span className="block text-gray-400 text-sm">{book.author}</span>
            </div>
            <RatingStars rate={rate} />
          </div>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
      </Box>
    </div>
  );
}
