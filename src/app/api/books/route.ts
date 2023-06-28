import { prisma } from '@/lib/prisma';
import { Book } from '@prisma/client';
import { NextResponse } from 'next/server';

interface BookWithAverageRate extends Book {
  averageRate: number;
}

export async function GET() {
  const booksWithAverageRate = await prisma.$queryRaw<BookWithAverageRate[]>`
  SELECT
    b.*,
    AVG(r.rate) AS averageRate
  FROM
    books b
    LEFT JOIN ratings r ON r.book_id = b.id
  GROUP BY
    b.id;
`;

  const booksWithIntegerAverageRate = booksWithAverageRate.map((book) => ({
    ...book,
    averageRate: Math.floor(book.averageRate),
  }));

  return NextResponse.json(booksWithIntegerAverageRate);
}
