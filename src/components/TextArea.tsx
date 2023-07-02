import { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ value, ...props }: Props) {
  return (
    <label className="relative h-48 w-full py-[0.875rem] px-5 bg-gray-800 flex justify-between border border-gray-500 rounded group focus-within:ring-1 focus-within:ring-green-200">
      <textarea
        maxLength={450}
        className="placeholder:text-gray-400 text-gray-200 bg-transparent focus:outline-none caret-green-200 h-full w-full resize-none text-sm"
        value={value}
        {...props}
      />
      <span className="block absolute right-2 bottom-1 text-sm text-gray-400">
        {value?.toString().length ?? 0} / 450
      </span>
    </label>
  );
}
