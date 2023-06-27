import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getYear } from 'date-fns';

interface Response {
  created_year: number;
  pages_read: number;
  books_rated: number;
  authors_read: number;
  most_read_category: string;
}

export async function GET(
  _: Request,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;

  const user = await prisma.user.findUnique({
    where: { id: user_id },
    include: {
      ratings: {
        include: {
          book: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({
      error: 'User not found',
    });
  }

  const pages_read = user.ratings.reduce(
    (acc, rating) => acc + rating.book.total_pages,
    0
  );
  const books_rated = user.ratings.length;
  const authors_read = Array.from(
    new Set(user.ratings.map((rating) => rating.book.author))
  );
  const categoriesCount = user.ratings.flatMap((rating) =>
    rating.book.categories.map((category) => category.category.name)
  );

  const categoryCount = categoriesCount.reduce((acc: any, category: string) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const maxCategoryCount = Math.max(
    ...Object.values(categoryCount).map((count) => Number(count))
  );
  const mostReadCategory = Object.keys(categoryCount).find(
    (category) => categoryCount[category] === maxCategoryCount
  );

  const created_year = getYear(user.created_at);

  const response: Response = {
    pages_read,
    books_rated,
    authors_read: authors_read.length,
    most_read_category: mostReadCategory || '',
    created_year,
  };

  return NextResponse.json(response);
}
