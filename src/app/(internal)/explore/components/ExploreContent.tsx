'use client';

import { BookDrawer } from '@/components/BookDrawer';
import { ExploreBookCard } from '@/components/ExploreBookCard';
import { FilterTag } from '@/components/FilterTag';
import { Book, Category } from '@prisma/client';
import { useState } from 'react';

interface ExploreBook extends Book {
  categories: string[];
  average_rate: number;
  total_rates: number;
  read: boolean;
}

interface Props {
  categories: Category[];
  books: ExploreBook[];
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

  const [isBookDrawerOpen, setIsBookDrawerOpen] = useState(false);
  const [currentSelectedBook, setCurrentSelectedBook] =
    useState<ExploreBook | null>(null);

  function handleBookDrawerOpen(book: ExploreBook) {
    setCurrentSelectedBook(book);
    setIsBookDrawerOpen(true);
  }

  async function handleBookDrawerClose() {
    setIsBookDrawerOpen(false);
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
