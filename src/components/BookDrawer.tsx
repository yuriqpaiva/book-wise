import {
  BookOpenIcon,
  BookmarkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { Box } from './Box';
import Image from 'next/image';
import { RatingStars } from './RatingStars';
import { Book } from '@prisma/client';

interface ExploreBook extends Book {
  average_rate: number;
  total_rates: number;
  read: boolean;
  categories: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  book: ExploreBook | null;
}

export function BookDrawer({ isOpen, onClose, book }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 transition-all ease-in-out duration-200 ${
          isOpen ? 'bg-black opacity-60 z-10' : 'opacity-0 -z-10'
        }`}
      ></div>
      <div
        ref={drawerRef}
        className={`h-screen bg-gray-800 fixed right-0 top-0 transition-all duration-200 ease-in-out z-20 w-[660px] px-12 py-6
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <div className="flex justify-end">
          <button onClick={onClose}>
            <XMarkIcon className="w-8 h-8 text-gray-400 right-12" />
          </button>
        </div>
        {book && (
          <Box className="bg-gray-700 mt-4 ">
            <div className="flex gap-8">
              <Image src={book.cover_url} height={242} width={171} alt="" />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-100">
                    {book.name}
                  </h3>
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
        )}
      </div>
    </>
  );
}
