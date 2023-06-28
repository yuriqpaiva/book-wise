'use client';

import { ExploreBookCard } from '@/components/ExploreBookCard';
import { FilterTag } from '@/components/FilterTag';
import { Book, Category } from '@prisma/client';
import { useState } from 'react';

interface BookWithAverageRate extends Book {
  averageRate: number;
}

interface Props {
  categories: Category[];
  books: BookWithAverageRate[];
}

export function ExploreContent({ categories, books }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function handleSelectAll() {
    setSelectedCategories([]);
  }

  function handleCategoryClick(categoryId: string) {
    setSelectedCategories((prev) => [...prev, categoryId]);
  }

  return (
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
            <ExploreBookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
