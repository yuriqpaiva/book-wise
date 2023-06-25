import { RatingCard } from '@/components/RatingCard';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export interface RatingBook {
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

export async function getRatingBooks() {
  const res = await import('../api/books/recent-ratings/route');

  return await (await res.GET()).json();
}

export default async function Home() {
  const ratingBooks = (await getRatingBooks()) as RatingBook[];

  return (
    <div>
      <h1 className="flex gap-3 text-2xl font-semibold">
        <ArrowTrendingUpIcon className="h-8 w-8 text-green-100" />
        Home page
      </h1>
      <h2 className="text-sm font-normal mt-10 mb-4">
        Avaliações mais recentes
      </h2>

      <div className="flex flex-col gap-3 pb-10">
        {ratingBooks.map((book) => (
          <RatingCard key={book.book.name} {...book} />
        ))}
      </div>
    </div>
  );
}
