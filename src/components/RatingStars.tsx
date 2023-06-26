import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

interface Props {
  rate: number;
}

export function RatingStars({ rate }: Props) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rate }).map((_, i) => (
        <StarIconSolid className="h-4 w-4 text-purple-100" key={i} />
      ))}
      {Array.from({ length: 5 - rate }).map((_, i) => (
        <StarIconOutline className="h-4 w-4 text-purple-100" key={i} />
      ))}
    </div>
  );
}
