import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SearchInput() {
  return (
    <label className="w-full py-[0.875rem] px-5 bg-gray-800 flex justify-between border border-gray-500 rounded group focus-within:ring-1 focus-within:ring-green-200">
      <input type="text" placeholder="Buscar livro avaliado" className="placeholder:text-gray-400 text-gray-200 bg-transparent focus:outline-none caret-green-200"/>
      <MagnifyingGlassIcon className="group-focus-within:text-green-200 h-6 w-6 text-gray-500"/>
    </label>
  );
}
