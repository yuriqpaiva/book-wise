import Image from 'next/image';
import { ReactNode } from 'react';
import logoImage from '../../assets/logo.svg';
import { Sidebar } from '@/components/Sidebar';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-5 flex h-screen ">
      <aside className="w-[232px] rounded-xl bg-aside bg-no-repeat bg-cover flex flex-col items-center px-12 py-8">
        <div className="flex justify-center mb-16">
          <Image src={logoImage} alt="" width={128} height={32} quality={100} />
        </div>

        <Sidebar />
      </aside>
      <main>{children}</main>
    </div>
  );
}
