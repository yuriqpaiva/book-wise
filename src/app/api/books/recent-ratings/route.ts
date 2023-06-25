import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const recentRatingBooks = await prisma.rating.findMany({
    include: {
      user: true,
      book: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return NextResponse.json(recentRatingBooks);
}
