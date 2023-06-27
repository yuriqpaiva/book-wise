'use client';

import { FilterTag } from '@/components/FilterTag';
import { Category } from '@prisma/client';
import { useState } from 'react';

interface Props {
  categories: Category[];
}

export function ExploreContent({ categories }: Props) {
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
      </div>
    </div>
  );
}
