import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { book_id: string } }
) {
  const { book_id } = params;

  const ratings = await prisma.rating.findMany({
    orderBy: {
      created_at: 'desc',
    },
    where: {
      book_id: book_id,
    },
    include: {
      user: true,
    },
  });

  if (!ratings) {
    return NextResponse.json({
      error: 'User not found',
    });
  }

  return NextResponse.json(ratings);
}
