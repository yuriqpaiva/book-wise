import { PopularBookCard } from '@/components/PopularBookCard';
import { RatingCard } from '@/components/RatingCard';
import {
  ArrowTrendingUpIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Book {
  name: string;
  author: string;
  summary: string;
  cover_url: string;
  total_pages: number;
  created_at: Date;
  averageRate: number;
}

export interface RatingBook {
  user: {
    name: string;
    avatar_url: string;
  };
  rate: number;
  created_at: string;
  book: Book;
}

export async function getRecentRatingBooks() {
  const res = await import('../api/books/recent-ratings/route');

  return await (await res.GET()).json();
}

export async function getMostRatedBooks() {
  const res = await import('../api/books/most-rated/route');

  return await (await res.GET()).json();
}

export default async function Home() {
  const ratingBooks = (await getRecentRatingBooks()) as RatingBook[];
  const mostRatedBooks = (await getMostRatedBooks()) as Book[];

  return (
    <div className="grid grid-cols-content gap-x-16">
      <div className="">
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
      <div className="">
        <div className="mt-[4.5rem] mb-4 flex items-center justify-between">
          <h2 className="text-sm">Livros populares</h2>
          <Link
            href="/books"
            className="flex items-center gap-2 text-sm text-purple-100 font-semibold"
          >
            Ver todos
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {mostRatedBooks.map((book) => (
            <PopularBookCard key={book.name} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
