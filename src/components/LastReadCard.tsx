import { Box } from './Box';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { formatDistance } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';
import { Book } from '@prisma/client';

interface BookWithAverageRate extends Book {
  average_rate: number;
}

async function getLastReadBook(userId: string | null) {
  const res = await fetch(
    `http://localhost:3000/api/books/last-read/${userId}`
  );

  return res.json();
}

export async function LastReadCard() {
  const data = await getServerSession(authOptions);

  if (!data) {
    return null;
  }

  const book = (await getLastReadBook(
    data?.user.id ?? null
  )) as BookWithAverageRate;

  if (!book) {
    return null;
  }

  const formattedDistanceDate = formatDistance(
    new Date(book.created_at),
    new Date(),
    { addSuffix: true, locale: pt_BR }
  );

  return (
    <>
      <h2 className="text-sm font-normal mt-10 mb-4">Sua última leitura</h2>
      <Box className="lg:max-w-[560px] bg-gray-600">
        <div className="flex gap-5">
          <Image
            src={book.cover_url}
            alt=""
            width={108}
            height={152}
            className="object-cover rounded-md"
          />
          <div className="flex flex-col justify-between">
            <div>
              <div className="justify-between flex lg:mb-5 mb-2">
                <span className="block text-gray-300 text-sm">
                  {formattedDistanceDate}
                </span>
                <div className="lg:flex hidden gap-1">
                  {Array.from({ length: book.average_rate }).map((_, i) => (
                    <StarIconSolid
                      className="h-4 w-4 text-purple-100"
                      key={i}
                    />
                  ))}
                  {Array.from({ length: 5 - book.average_rate }).map((_, i) => (
                    <StarIconOutline
                      className="h-4 w-4 text-purple-100"
                      key={i}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex lg:hidden gap-1 mb-5">
                  {Array.from({ length: book.average_rate }).map((_, i) => (
                    <StarIconSolid
                      className="h-4 w-4 text-purple-100"
                      key={i}
                    />
                  ))}
                  {Array.from({ length: 5 - book.average_rate }).map((_, i) => (
                    <StarIconOutline
                      className="h-4 w-4 text-purple-100"
                      key={i}
                    />
                  ))}
                </div>
                <h3 className="font-semibold line-clamp-2">{book.name}</h3>
                <span className="block text-gray-400 text-sm mb-5 font-normal">
                  {book.author}
                </span>
              </div>
            </div>
            <p className="line-clamp-4 text-sm text-gray-300">{book.summary}</p>
          </div>
        </div>
      </Box>
    </>
  );
}
