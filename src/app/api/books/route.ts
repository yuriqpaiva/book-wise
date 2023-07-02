import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;

  const user_id = query.get('user_id') ?? '';

  const booksWithAverageRate = await getBooksAndRatings(user_id);

  const booksWithIntegerAverageRateAndWasRated = booksWithAverageRate.map(
    (book) => ({
      id: book.id,
      name: book.name,
      author: book.author,
      cover_url: book.cover_url,
      total_pages: book.total_pages,
      total_rates: book.total_rates,
      read: book.rated,
      categories: book.categories,
      average_rate: Math.floor(book.average_rate),
      created_at: book.created_at,
      ratings: book.ratings,
    })
  );

  return NextResponse.json(booksWithIntegerAverageRateAndWasRated);
}

async function getBooksAndRatings(user_id: string) {
  const books = await prisma.book.findMany({
    include: {
      categories: {
        select: {
          category: true,
        },
      },
      ratings: {
        orderBy: {
          created_at: 'desc',
        },
        select: {
          user_id: true,
          user: true,
          rate: true,
          description: true,
          created_at: true,
        },
      },
    },
  });

  const booksWithAverageRate = books.map((book) => {
    const { ratings, ...bookData } = book;
    const totalRates = ratings.length;
    const sumRates = ratings.reduce((sum, rating) => sum + rating.rate, 0);
    const averageRate = Math.floor(sumRates / totalRates);

    return {
      ...bookData,
      ratings,
      average_rate: averageRate,
      total_rates: totalRates,
      categories: book.categories.map((category) => category.category.name),
      rated: ratings.some((rating) => rating.user_id === user_id),
    };
  });

  return booksWithAverageRate;
}
