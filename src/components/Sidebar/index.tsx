'use client';

import {
  HomeIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { SidebarItem } from './SidebarItem';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
      </ul>

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
