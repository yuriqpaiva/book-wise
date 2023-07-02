import { prisma } from '@/lib/prisma';
import { Book } from '@prisma/client';
import { NextResponse } from 'next/server';

interface BookWithAverageRate extends Book {
  average_rate: number;
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
        include: { book: true },
        orderBy: { created_at: 'desc' },
        take: 1,
      },
    },
  });

  if (!user) {
    return NextResponse.json({
      error: 'User not found',
    });
  }

  const lastCreatedRating = user.ratings[0] ?? null;
  const book = lastCreatedRating?.book ?? null;

  if (book) {
    const ratings = await prisma.rating.findMany({
      where: { book_id: book.id },
    });

    if (ratings.length === 0) {
      return null;
    }

    const sum = ratings.reduce((total, rating) => total + rating.rate, 0);
    const averageRate = sum / ratings.length;

    const roundedAverageRate = Math.floor(averageRate);

    const bookWithAverageRate: BookWithAverageRate = {
      ...book,
      average_rate: roundedAverageRate,
    };

    return NextResponse.json(bookWithAverageRate);
  }

  return NextResponse.json(null);
}
