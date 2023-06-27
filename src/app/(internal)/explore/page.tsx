import { SearchInput } from '@/components/SearchInput';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { Category } from '@prisma/client';
import { useState } from 'react';
import { ExploreContent } from './components/ExploreContent';

async function getCategories() {
  const response = await fetch(`${process.env.APP_URL}/api/books/categories`);
  const data = (await response.json()) as Category[];

  return data;
}

export default async function Explore() {
  const categories = await getCategories();

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between w-full">
        <h1 className="flex gap-3 text-2xl font-semibold mb-10">
          <BookOpenIcon className="h-8 w-8 text-green-100" />
          Explorar
        </h1>
        <SearchInput className="max-w-[433px]" />
      </div>

      <ExploreContent categories={categories} />
    </div>
  );
}
