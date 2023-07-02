import Image from 'next/image';
import { ReactNode } from 'react';
import logoImage from '../../assets/logo.svg';
import { Sidebar } from '@/components/Sidebar';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="py-5 pl-5 flex h-screen">
      <div className="w-[232px]" />
      <aside className="w-[232px] rounded-xl bg-aside bg-no-repeat bg-cover flex flex-col items-center px-10 py-8 fixed h-[calc(100vh-2.5rem)]">
        <div className="flex justify-center mb-16">
          <Image src={logoImage} alt="" width={128} height={32} quality={100} />
        </div>

        <Sidebar />
      </aside>
      <main className="w-full pl-32 pt-16 pr-24 overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
