'use client';

import {
  HomeIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { SidebarItem } from './SidebarItem';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Início', href: '/', icon: HomeIcon },
  { name: 'Explorar', href: '/explore', icon: BookOpenIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data, status } = useSession();

  return (
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
            className="h-8 w-8 rounded-full"
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
  );
}
