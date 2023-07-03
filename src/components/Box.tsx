import { ReactNode, ElementType, FormEvent } from 'react';

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  onSubmit?: (event: FormEvent) => void;
}

export function Box({
  as: Element = 'div',
  children,
  className = '',
  onSubmit,
  ...rest
}: Props) {
  return (
    <Element
      className={`bg-gray-700 p-6 rounded-lg ${className}`}
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </Element>
  );
}
