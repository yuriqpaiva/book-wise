import { SearchInput } from '@/components/SearchInput';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { Book, Category } from '@prisma/client';
import { ExploreContent } from './components/ExploreContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface BookWithAverageRate extends Book {
  read: boolean;
  average_rate: number;
}

async function getCategories() {
  const response = await fetch(`${process.env.APP_URL}/api/books/categories`);
  const data = (await response.json()) as Category[];

  return data;
}

async function getBooks(userId: string) {
  const response = await fetch(`${process.env.APP_URL}/api/books?user_id=${userId}`);
  const data = (await response.json()) as BookWithAverageRate[];

  return data;
}

export default async function Explore() {
  const data = await getServerSession(authOptions)
  const categoriesData = getCategories();
  const booksData = getBooks(data?.user.id ?? '');

  const [categories, books] = await Promise.all([categoriesData, booksData]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between w-full">
        <h1 className="flex gap-3 text-2xl font-semibold mb-10">
          <BookOpenIcon className="h-8 w-8 text-green-100" />
          Explorar
        </h1>
        <SearchInput className="max-w-[433px]" />
      </div>

      <ExploreContent categories={categories} books={books} />
    </div>
  );
}
