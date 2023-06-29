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
      read: book.rated,
      average_rate: Math.floor(book.average_rate),
      created_at: book.created_at,
    })
  );

  return NextResponse.json(booksWithIntegerAverageRateAndWasRated);
}

async function getBooksAndRatings(user_id: string) {
  const books = await prisma.book.findMany({
    include: {
      ratings: {
        select: {
          rate: true,
          user_id: true,
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
      average_rate: averageRate,
      rated: ratings.some((rating) => rating.user_id === user_id),
    };
  });

  return booksWithAverageRate;
}
