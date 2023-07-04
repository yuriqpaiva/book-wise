import { Book, Category, Rating, User } from '@prisma/client';
import { ExploreContent } from './components/ExploreContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { HydrateExploreBooksAtoms } from './components/HydrateExploreBooksAtoms';

export interface RatingWithUser extends Rating {
  user: User;
  distance_date: string;
}

export interface ExploreBookData extends Book {
  categories: string[];
  total_rates: number;
  read: boolean;
  average_rate: number;
  ratings: RatingWithUser[];
}

async function getCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/books/categories`
  );
  const data = (await response.json()) as Category[];

  return data;
}

async function getBooks(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/books?user_id=${userId}`
  );
  const data = (await response.json()) as ExploreBookData[];

  return data;
}

export default async function Explore() {
  const data = await getServerSession(authOptions);
  const categoriesData = getCategories();
  const booksData = getBooks(data?.user.id ?? '');

  const [categories, books] = await Promise.all([categoriesData, booksData]);

  return (
    <HydrateExploreBooksAtoms booksFromServer={books}>
      <div className="flex w-full flex-col">
        <ExploreContent categories={categories} userId={data?.user?.id ?? ''} />
      </div>
    </HydrateExploreBooksAtoms>
  );
}
