'use client';

import {
  HomeIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  Bars3Icon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/24/outline';
import { SidebarItem } from './SidebarItem';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import logoImage from '../../assets/logo.svg';
import { useAtom } from 'jotai';
import { closeSidebarAtom, toggleSidebarAtom } from '@/atoms/sidebar-atoms';
import clsx from 'clsx';

const navigation = [
  { name: 'Início', href: '/', icon: HomeIcon },
  { name: 'Explorar', href: '/explore', icon: BookOpenIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data, status } = useSession();

  const [isSidebarOpen, toggleSidebar] = useAtom(toggleSidebarAtom);
  const [, closeSidebar] = useAtom(closeSidebarAtom);

  return (
    <>
      <div
        onClick={toggleSidebar}
        className={clsx('fixed inset-0 transition-all', {
          'block z-20 backdrop-blur-sm': isSidebarOpen,
          'backdrop-blur-none -z-10': !isSidebarOpen,
        })}
      />

      {/* Top Menu */}
      <div className="fixed top-0 left-0 w-full h-16 items-center px-12 xl:hidden flex bg-gray-600 z-10">
        <button onClick={toggleSidebar} className="absolute">
          <Bars3Icon className="h-10 w-10 text-purple-100" />
        </button>
        <Image
          src={logoImage}
          alt=""
          width={120}
          height={120}
          quality={100}
          className="mx-auto"
        />
      </div>

      <div className="xl:w-[232px]" />
      <aside
        className={`z-30 transition-all duration-200 ease-in-out w-[232px] rounded-xl bg-aside bg-no-repeat bg-cover flex flex-col items-center px-10 xl:py-8 py-16 fixed h-[calc(100%-2.5rem)] 
      ${isSidebarOpen ? 'translate-x-0' : 'xl:translate-x-0 -translate-x-full'}
      `}
      >
        <button
          className="absolute right-5 top-5 bg-gray-500 p-1 rounded xl:hidden"
          onClick={closeSidebar}
        >
          <ChevronDoubleLeftIcon className="h-5 w-5 text-purple-100" />
        </button>

        <div className="flex justify-center mb-16">
          <Image src={logoImage} alt="" width={128} height={32} quality={100} />
        </div>
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col gap-6 h-full">
            {navigation.map((item) => (
              <SidebarItem
                key={item.name}
                Icon={item.icon}
                name={item.name}
                href={item.href}
                active={pathname === item.href}
              />
            ))}
            {status === 'authenticated' && (
              <SidebarItem
                Icon={UserIcon}
                name="Perfil"
                href="/profile"
                active={pathname === '/profile'}
              />
            )}
          </ul>

          {status === 'authenticated' && (
            <div className="flex items-center gap-3 justify-between">
              <Image
                src={data?.user?.avatar_url}
                width={40}
                height={40}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
              <strong className="block font-normal text-sm text-gray-200">
                {data.user.name}
              </strong>
              <button
                className="leading-none"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500" />
              </button>
            </div>
          )}

          {status === 'unauthenticated' && (
            <div>
              <Link
                className="flex gap-3 text-gray-200"
                prefetch={false}
                href="/login"
              >
                Fazer login
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-green-100" />
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
