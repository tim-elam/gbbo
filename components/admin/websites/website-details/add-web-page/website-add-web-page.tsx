'use client';

import { PlusIcon } from '@heroicons/react/20/solid';
import { addWebsiteWebPage } from './actions';
import React, { ChangeEvent, useState } from 'react';
import { clsx } from 'clsx';
import { useFormStatus } from 'react-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface WebsiteAddWebPageProps {
  website: {
    slug: string;
    origin: string;
  };
}

export default function WebsiteAddWebPage({ website }: WebsiteAddWebPageProps) {
  const { pending } = useFormStatus();
  const [pathname, setPathname] = useState('');
  const { slug, origin } = website;

  function handlePathnameChange(event: ChangeEvent<HTMLInputElement>) {
    setPathname(event.target.value);
  }

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-screen-md shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <DocumentTextIcon className="size-6"/>
          Add Web Page
        </h2>
        <div className="my-4 flex flex-col gap-2">
          <label className="input input-bordered w-full flex items-center">
            { origin }
            <input className="grow"
                   type="text"
                   placeholder="/about-us"
                   value={ pathname }
                   onChange={ handlePathnameChange }
                   required/>
          </label>
        </div>
        <div className="card-actions self-end">
          <button
            className={ clsx('btn btn-primary', { 'animate-pulse': pending }) }
            onClick={ () => addWebsiteWebPage({
              websiteSlug: slug,
              websiteOrigin: origin,
              pathname,
            }) }>
            <PlusIcon className="size-6"/>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
