import Link from 'next/link';
import { ReactElement, ReactNode } from 'react';

interface Props {
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
  name: string;
  active?: boolean;
}

export function SidebarItem({ Icon, href, name, active = false }: Props) {
  return (
    <li className="relative">
      {active && (
        <div className="top-0 h-full bg-gradient-vertical -left-5 absolute w-1 rounded-full"></div>
      )}
      <Link
        prefetch={false}
        href={href}
        className={`flex items-center gap-3 ${!active && 'text-gray-400 hover:text-gray-300'}`}
      >
        <Icon className="h-6 w-6 font-semibold" />
        {name}
      </Link>
    </li>
  );
}
