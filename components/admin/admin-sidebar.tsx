'use client';

import Link from 'next/link';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
  HomeIcon,
  ScaleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ComponentType, SVGProps, useState } from 'react';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

export interface AdminNavigationLink {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);

  function toggleDrawerExpanded() {
    setIsDrawerExpanded(expanded => !expanded);
  }

  const links: AdminNavigationLink[] = [
    {
      label: 'Home',
      href: '/admin',
      Icon: HomeIcon,
    },
    {
      label: 'Issues',
      href: '/admin/issues',
      Icon: ScaleIcon,
    },
    {
      label: 'Races',
      href: '/admin/races',
      Icon: FlagIcon,
    },
    {
      label: 'People',
      href: '/admin/people',
      Icon: UserIcon,
    },
  ];

  function linkClick() {
    const adminNavDrawerControl = document.getElementById('admin-nav-drawer') as HTMLInputElement;
    adminNavDrawerControl.checked = false;
  }

  return (
    <div className="drawer-side h-full !overflow-y-hidden">
      <label htmlFor="admin-nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className={ clsx('menu bg-base-100 p-4 border-b-2 border-b-slate-200 h-24 border-b-2 border-b-white', {
        'w-64': isDrawerExpanded,
      }) }>
        <li onClick={ toggleDrawerExpanded } className="max-md:hidden text-2xl cursor-pointer">
          <div className="flex flex-row gap-2 items-center">
            {
              isDrawerExpanded
                ? <ChevronLeftIcon className="size-6 my-2"/>
                : <ChevronRightIcon className="size-6 my-2"/>
            }
          </div>
        </li>
      </ul>
      <ul className={ clsx('menu bg-base-200 p-4 h-full', {
        'w-64': isDrawerExpanded,
        'w-22': !isDrawerExpanded,
      }) }>
        {
          links.map(({ label, href, Icon }) => {
            const active = pathname === href;
            return (
              <li key={ `${ label }:${ href }` } className="text-xl">
                {
                  active ?
                    <div className="flex flex-row gap-2 items-center active">
                      <Icon className="my-2 size-6"/>
                      { isDrawerExpanded && label }
                    </div>
                    :
                    <Link href={ href } onClick={linkClick}>
                      <div className="flex flex-row gap-2 items-center">
                        <Icon className="my-2 size-6"/>
                        { isDrawerExpanded && label }
                      </div>
                    </Link>
                }
              </li>);
          })
        }
      </ul>
    </div>
  );
}
