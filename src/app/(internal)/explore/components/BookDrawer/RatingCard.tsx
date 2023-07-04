import Image from 'next/image';
import { Box } from '../../../../../components/Box';
import { RatingStars } from '../../../../../components/RatingStars';
import { useSession } from 'next-auth/react';

interface Props {
  rating: {
    rate: number;
    description: string;
    distance_date: string;
    user: {
      id: string;
      name: string;
      avatar_url: string | null;
    };
  };
}

export function RatingCard({ rating }: Props) {
  const {data} = useSession()
  const isUser = data?.user?.id === rating.user.id

  return (
    <Box className={`${isUser ? 'bg-gray-650' : 'bg-gray-700'}`}>
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
            <strong className="font-semibold block">{rating.user.name}</strong>
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
  );
}
