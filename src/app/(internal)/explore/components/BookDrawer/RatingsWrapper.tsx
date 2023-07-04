import { RatingWithUser } from '@/app/(internal)/explore/page';
import { RatingCard } from './RatingCard';

interface Props {
  children?: React.ReactNode;
}

export function RatingsWrapper({ children }: Props) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      {children}
    </div>
  );
}
