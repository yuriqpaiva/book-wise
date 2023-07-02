'use client';

import { BookDrawer } from '@/components/BookDrawer';
import { ExploreBookCard } from '@/components/ExploreBookCard';
import { FilterTag } from '@/components/FilterTag';
import { Category } from '@prisma/client';
import { useState } from 'react';
import { ExploreBookData } from '../page';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  closeBookDrawerAtom,
  isBookDrawerOpenAtom,
  openBookDrawerAtom,
} from '@/atoms/book-drawer-atoms';

interface Props {
  categories: Category[];
  books: ExploreBookData[];
}

export function ExploreContent({ categories, books }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function handleSelectAll() {
    setSelectedCategories([]);
  }

  function handleCategoryClick(categoryId: string) {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== categoryId)
      );
      return;
    }
    setSelectedCategories((prev) => [...prev, categoryId]);
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
    <>
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

          <div className="w-full grid grid-cols-3 gap-5 mt-12 mb-10">
            {books.map((book) => (
              <ExploreBookCard
                key={book.id}
                book={book}
                onClick={() => handleBookDrawerOpen(book)}
              />
            ))}
          </div>
        </div>
      </div>
      <BookDrawer
        isOpen={isBookDrawerOpen}
        onClose={handleBookDrawerClose}
        book={currentSelectedBook}
      />
    </>
  );
}
