import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;

  const user_id = query.get('user_id') ?? '';

  const bookOrAuthor = query.get('book_or_author') ?? '';

  const booksWithAverageRate = await getBooksAndRatings(user_id, bookOrAuthor);

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

async function getBooksAndRatings(userId: string, bookOrAuthor: string) {
  const books = await prisma.book.findMany({
    orderBy: {
      created_at: 'desc',
    },
    where: {
      categories: {
        some: {
          category: {
            id: {
              contains: '',
            }
          }
        }
      },
      OR: [
        {
          name: {
            contains: bookOrAuthor,
          },
        },
        {
          author: {
            contains: bookOrAuthor,
          },
        },
      ],
    },
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
          rate: true,
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
      rated: ratings.some((rating) => rating.user_id === userId),
    };
  });

  return booksWithAverageRate;
}

const createRatingBodySchema = z.object({
  user_id: z.string(),
  book_id: z.string(),
  rate: z.number().int().min(1).max(5),
  description: z.string().max(450),
});

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  try {
    const ratingDTO = createRatingBodySchema.parse(body);

    await prisma.rating.create({
      data: {
        ...ratingDTO,
      },
    });

    return NextResponse.json({ message: 'Rating created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
