'use client';

import { BookDrawer } from '@/app/(internal)/explore/components/BookDrawer';
import { ExploreBookCard } from '@/components/ExploreBookCard';
import { FilterTag } from '@/components/FilterTag';
import { Category } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { ExploreBookData } from '../page';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  closeBookDrawerAtom,
  isBookDrawerOpenAtom,
  openBookDrawerAtom,
} from '@/atoms/book-drawer-atoms';
import { exploreBooksAtom } from '@/atoms/explore-book-atoms';
import { BookOpenIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { SearchInput } from '@/components/SearchInput';

interface Props {
  categories: Category[];
  userId: string;
}

export function ExploreContent({ categories, userId }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [currentBooks, setCurrentBooks] = useAtom(exploreBooksAtom);

  const searchFilterQueryRef = useRef<HTMLInputElement>(null);

  async function filterBooks(categories?: string[]) {
    const params = new URLSearchParams();
    params.append('user_id', userId);
    params.append('book_or_author', searchFilterQueryRef.current?.value ?? '');

    if (categories) {
      params.append('categories', categories.join(','));
    }

    const url = `${
      process.env.NEXT_PUBLIC_APP_URL
    }/api/books?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    setCurrentBooks(data);
  }

  function handleSelectAll() {
    setSelectedCategories([]);
    filterBooks();
  }

  function handleCategoryClick(categoryId: string) {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== categoryId)
      );
      return;
    }

    setSelectedCategories((prev) => [...prev, categoryId]);

    const nextSelectedCategories = [...selectedCategories, categoryId];
    filterBooks(nextSelectedCategories);
  }

  const isBookDrawerOpen = useAtomValue(isBookDrawerOpenAtom);
  const closeBookDrawer = useSetAtom(closeBookDrawerAtom);
  const openBookDrawer = useSetAtom(openBookDrawerAtom);

  const [currentSelectedBook, setCurrentSelectedBook] =
    useState<ExploreBookData | null>(null);

  function handleBookDrawerOpen(book: ExploreBookData) {
    setCurrentSelectedBook(book);
    openBookDrawer();
  }

  async function handleBookDrawerClose() {
    closeBookDrawer();
  }

  return (
    <div className="max-w-[1140px]">
      <div className="flex justify-between w-full">
        <h1 className="flex gap-3 text-2xl font-semibold mb-10">
          <BookOpenIcon className="h-8 w-8 text-green-100" />
          Explorar
        </h1>
        <SearchInput
          ref={searchFilterQueryRef}
          onTimeout={filterBooks}
          className="max-w-[433px]"
          placeholder="Buscar livro ou autor"
        />
      </div>
      <div className="mt-10">
        <div className="flex flex-wrap gap-3">
          <FilterTag
            selected={selectedCategories.length === 0}
            name="Tudo"
            onClick={handleSelectAll}
          />
          {categories.map((category) => (
            <FilterTag
              key={category.id}
              name={category.name}
              selected={selectedCategories.includes(category.id)}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}

          {currentBooks.length > 0 ? (
            <div className="w-full grid grid-cols-3 gap-5 mt-12 mb-10">
              {currentBooks.map((book) => (
                <ExploreBookCard
                  key={book.id}
                  book={book}
                  onClick={() => handleBookDrawerOpen(book)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-[calc(100vh-500px)] gap-5 mt-12 mb-10 flex flex-col justify-center items-center">
              <FaceFrownIcon
                className="h-32 w-32 text-gray-300"
                strokeWidth={1}
              />
              <span className="text-gray-300">
                Não conseguimos encontrar nenhum livro relacionado à sua busca.
              </span>
            </div>
          )}
        </div>
      </div>
      <BookDrawer
        isOpen={isBookDrawerOpen}
        onClose={handleBookDrawerClose}
        book={currentSelectedBook}
      />
    </div>
  );
}
