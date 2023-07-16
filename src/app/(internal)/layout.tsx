import { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="py-5 pl-5 flex">
      <Sidebar />
      <main className="w-full xl:pl-32 pl-6 pt-16 xl:pr-24 pr-4 overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
