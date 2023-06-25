import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const mostRatedBooks = await prisma.book.findMany({
    include: {
      ratings: true,
    },
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    take: 4,
  });

  const booksWithAverageRate = mostRatedBooks.map((book) => {
    const ratingsCount = book.ratings.length;
    const totalRate = book.ratings.reduce(
      (sum, rating) => sum + rating.rate,
      0
    );
    const averageRate =
      ratingsCount > 0 ? Math.floor(totalRate / ratingsCount) : 0;

    const { ratings, ...bookWithoutRatings } = book;

    return {
      ...bookWithoutRatings,
      averageRate: averageRate,
    };
  });

  return NextResponse.json(booksWithAverageRate);
}
