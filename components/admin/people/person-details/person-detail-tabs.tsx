'use client';

import Link from 'next/link';
import { FlagIcon, LightBulbIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { ComponentType, SVGProps } from 'react';

interface PersonDetailTabsProps {
  slug: string;
}

interface PersonDetailTab {
  segment: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export default function PersonDetailTabs({ slug }: PersonDetailTabsProps) {
  const activeSegment = usePathname().split('/').pop();
  const tabs: PersonDetailTab[] = [
    {
      segment: 'positions',
      label: 'Positions',
      Icon: LightBulbIcon,
    },
    {
      segment: 'races',
      label: 'Races',
      Icon: FlagIcon,
    },
  ];

  return (
    <div role="tablist" className="tabs tabs-bordered tabs-lg">
      {
        tabs.map(({ segment, label, Icon }) => (
          <Link
            role="tab"
            key={segment}
            className={ clsx('tab  flex gap-1', {
              'tab-active': segment === activeSegment,
            }) }
            href={ `/admin/people/${ slug }/${ segment }` }>
            <Icon className="size-4"/>
            { label }
          </Link>
        ))
      }
    </div>
  );
}
