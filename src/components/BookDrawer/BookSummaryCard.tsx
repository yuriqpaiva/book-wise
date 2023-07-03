import { BookmarkIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Box } from '../Box';
import { RatingStars } from '../RatingStars';
import Image from 'next/image';
import { ExploreBookData } from '@/app/(internal)/explore/page';

interface Props {
  book: ExploreBookData | null;
}

export function BookSummaryCard({ book }: Props) {
  if (!book) {
    return null;
  }

  return (
    <Box className="bg-gray-700 mt-4 ">
      <div className="flex gap-8">
        <Image src={book.cover_url} height={242} width={171} alt="" />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-100">{book.name}</h3>
            <span className="block text-gray-300">{book.author}</span>
          </div>
          <div>
            <RatingStars rate={3} />
            <span className="mt-1 block text-sm text-gray-400">
              {book.total_rates} avaliações
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-600 grid grid-cols-2 gap-x-16 pt-6">
        <div className="flex items-center">
          <BookmarkIcon className="w-8 h-8 text-green-100 mr-4" />
          <div>
            <span className="block text-sm text-gray-300">Categoria</span>
            <strong className="block text-gray-200 font-semibold">
              {book.categories.map((category) => category).join(', ')}
            </strong>
          </div>
        </div>

        <div className="flex items-center">
          <BookOpenIcon className="w-8 h-8 text-green-100 mr-4" />
          <div>
            <span className="block text-sm text-gray-300">Páginas</span>
            <strong className="block text-gray-200 font-semibold">
              {book.total_pages}
            </strong>
          </div>
        </div>
      </div>
    </Box>
  );
}
