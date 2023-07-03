import { ExploreBookData } from '@/app/(internal)/explore/page';
import { Box } from '../Box';
import { RatingStars } from '../RatingStars';
import Image from 'next/image';

interface Props {
  book: ExploreBookData | null;
}

export function RatingsWrapper({ book }: Props) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      {book?.ratings.map((rating) => (
        <Box className="bg-gray-700" key={rating.id}>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image
                className="rounded-full h-10 w-10"
                src={rating.user?.avatar_url || ''}
                height={40}
                width={40}
                alt=""
              />
              <div>
                <strong className="font-semibold block">
                  {rating.user.name}
                </strong>
                <div className="first-letter:uppercase">
                  <span className="text-gray-400 text-sm">
                    {rating.distance_date}
                  </span>
                </div>
              </div>
            </div>
            <RatingStars rate={rating.rate} />
          </div>
          <p className="text-gray-300 font-sm mt-5">{rating.description}</p>
        </Box>
      ))}
    </div>
  );
}
