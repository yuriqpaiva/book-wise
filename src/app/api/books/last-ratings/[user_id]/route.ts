import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
      },
    },
  });

  if (!user) {
    return NextResponse.json({
      error: 'User not found',
    });
  }

  const ratings = user.ratings;

  return NextResponse.json(ratings);
}
