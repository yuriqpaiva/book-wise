import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function Box({ children, className = '' }: Props) {
  return <div className={`bg-gray-700 p-6 rounded-lg ${className}`}>{children}</div>;
}
