'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentType, SVGProps } from 'react';
import { FlagIcon, GlobeAltIcon, HomeIcon, LightBulbIcon, ScaleIcon, UserIcon } from '@heroicons/react/24/outline';

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    admin: HomeIcon,
    issues: ScaleIcon,
    races: FlagIcon,
    people: UserIcon,
    positions: LightBulbIcon,
    websites: GlobeAltIcon,
  };

  return (
    <div className="breadcrumbs text-lg">
      <ul>
        {
          segments.map((segment, index) => {
            const href = `/${ segments.slice(0, index + 1).join('/') }`;
            const label = decodeURIComponent(segment).replaceAll('-_', ' ');
            const Icon = icons[label];
            return <li key={ label + href } className="capitalize">
              {
                index + 1 < segments.length
                  ?
                  <Link href={ href } className="flex flex-row items-center gap-1">
                    { Icon && <Icon className="size-5"/> }
                    { label }
                  </Link>
                  :
                  <span className="flex flex-row items-center gap-1">
                    { Icon && <Icon className="size-5"/> }
                    { label }
                  </span>
              }
            </li>;
          })
        }
      </ul>
    </div>
  );
}
