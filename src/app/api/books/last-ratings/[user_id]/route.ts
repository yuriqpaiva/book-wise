import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;
  const query = request.nextUrl.searchParams;
  const filter = query.get('filter') ?? '';

  const user = await prisma.user.findUnique({
    where: { id: user_id },
    include: {
      ratings: {
        where: {
          book: {
            name: {
              contains: filter,
            },
          },
        },
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

  return NextResponse.json(user.ratings);
}
