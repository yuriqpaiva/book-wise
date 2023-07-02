import { SearchInput } from '@/components/SearchInput';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { Book, Category, Rating, User } from '@prisma/client';
import { ExploreContent } from './components/ExploreContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { formatDistance } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';

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
  const response = await fetch(`${process.env.APP_URL}/api/books/categories`);
  const data = (await response.json()) as Category[];

  return data;
}

async function getBooks(userId: string) {
  const response = await fetch(
    `${process.env.APP_URL}/api/books?user_id=${userId}`
  );
  const data = (await response.json()) as ExploreBookData[];

  const formattedBooks = data.map((book) => {
    const ratings = book.ratings.map((rating) => {
      return {
        ...rating,
        distance_date: formatDistance(new Date(rating.created_at), new Date(), {
          addSuffix: true,
          locale: pt_BR,
        }),
      };
    });

    return {
      ...book,
      ratings,
    };
  });

  return formattedBooks;
}

export default async function Explore() {
  const data = await getServerSession(authOptions);
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
        <SearchInput
          className="max-w-[433px]"
          placeholder="Buscar livro ou autor"
        />
      </div>

      <ExploreContent categories={categories} books={books} />
    </div>
  );
}
