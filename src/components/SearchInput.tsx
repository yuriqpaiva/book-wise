'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputHTMLAttributes, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onTimeout?: () => void;
}

export function SearchInput({ className = '', onTimeout, ...props }: Props) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleKeyUp = () => {
    clearTimeout(timeoutId!);
    if (onTimeout) {
      setTimeoutId(setTimeout(onTimeout, 1000));
    }
  };

  return (
    <label className={`max-h-12 w-full py-[0.875rem] px-5 bg-gray-800 flex items-center justify-between border border-gray-500 rounded group focus-within:ring-1 focus-within:ring-green-200 ${className}`}>
      <input
        type="text"
        className="placeholder:text-gray-400 text-gray-200 bg-transparent focus:outline-none caret-green-200 focus:ring-0"
        onKeyUp={handleKeyUp}
        {...props}
      />
      <MagnifyingGlassIcon className="group-focus-within:text-green-200 h-6 w-6 text-gray-500" />
    </label>
  );
}
