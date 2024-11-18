'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="breadcrumbs text-lg">
      <ul>
        {
          segments.map((segment, index) => {
            const href = `/${ segments.slice(0, index + 1).join('/') }`;
            const label = decodeURIComponent(segment).replaceAll('-_', ' ');
            return <li key={ label + href } className="capitalize">
              {
                index + 1 < segments.length
                  ? <Link href={ href }>{ label }</Link>
                  : <span>{label}</span>
              }
            </li>;
          })
        }
      </ul>
    </div>
  );
}
