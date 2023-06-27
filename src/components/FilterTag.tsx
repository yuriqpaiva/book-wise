import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

export const filterTagStyles = cva(
  'px-4 py-1 rounded-full flex items-center justify-center border transition-all duration-50',
  {
    variants: {
      selected: {
        true: 'bg-purple-200 border-purple-200',
        false:
          'bg-transparent border-purple-100 text-purple-100 hover:bg-purple-200 hover:text-gray-100',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filterTagStyles> {
  name: string;
}

export function FilterTag({ selected, name, ...props }: Props) {
  return (
    <button className={filterTagStyles({ selected })} {...props}>
      {name}
    </button>
  );
}
