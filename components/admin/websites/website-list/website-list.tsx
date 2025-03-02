'use client';

import { BugAntIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { crawl } from '@/components/admin/websites/website-list/actions';
import { useState } from 'react';
import { clsx } from 'clsx';

interface WebsitesListProps {
  websites: {
    origin: string;
    title: string;
    slug: string;
    personFirstName: string;
    personLastName: string;
    personSlug: string;
  }[];
}

export default function WebsitesList({ websites }: WebsitesListProps) {
  const [crawlingSlug, setCrawlingSlug] = useState('');

  async function handleCrawl(slug: string) {
    if (!crawlingSlug) {
      setCrawlingSlug(slug);
      await crawl({ slug });
      setCrawlingSlug('');
    }
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <GlobeAltIcon className="size-6"/>
          Websites
        </h2>
        <table className="table table-bordered table-zebra">
          <thead>
          <tr>
            <th>Title</th>
            <th>Origin</th>
            <th>Person</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            websites.map(({ title, origin, slug, personSlug, personLastName, personFirstName }) => (
              <tr key={ slug }>
                <td>
                  <Link
                    href={ `/admin/websites/${ slug }` }
                    className="btn btn-sm btn-link">
                    { title }
                  </Link>
                </td>
                <td>{ origin }</td>
                <td>
                  <Link
                    href={ `/admin/people/${ personSlug }` }
                    className="btn btn-sm btn-link">
                    { personFirstName } { personLastName }
                  </Link>
                </td>
                <td>
                  <button
                    className={ clsx('btn btn-sm btn-primary btn-outline btn-square', {
                      'animate-pulse': crawlingSlug === slug,
                    }) }
                    onClick={ () => handleCrawl(slug) }>
                    <BugAntIcon className="size-6"/>
                  </button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
