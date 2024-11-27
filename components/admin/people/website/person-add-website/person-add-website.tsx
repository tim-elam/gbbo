'use client';

import GlobeAltIcon from '@heroicons/react/24/outline/GlobeAltIcon';
import { PlusIcon } from '@heroicons/react/20/solid';
import { addWebsite } from './actions';
import React, { ChangeEvent, useState } from 'react';
import { clsx } from 'clsx';
import { useFormStatus } from 'react-dom';

interface PersonAddWebsiteProps {
  personSlug: string;
}

export default function PersonAddWebsite({ personSlug }: PersonAddWebsiteProps) {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState('');
  const [origin, setOrigin] = useState('');

  function handleOriginChange(event: ChangeEvent<HTMLInputElement>) {
    setOrigin(event.target.value);
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <GlobeAltIcon className="size-6"/>
          Add Website
        </h2>
        <div className="my-4 flex flex-col gap-2">
          <label className="my-4 input input-bordered flex items-center gap-2">
            Title:
            <input className="grow"
                   type="text"
                   placeholder="Candidate Site"
                   value={title}
                   onChange={handleTitleChange}
                   required/>
          </label>
          <label className="my-4 input input-bordered flex items-center gap-2">
            Origin:
            <input className="grow"
                   type="text"
                   placeholder="https://www.example.com"
                   value={origin}
                   onChange={handleOriginChange}
                   required/>
          </label>
        </div>
        <div className="card-actions self-end">
          <button
            className={ clsx('btn btn-primary', { 'animate-pulse': pending }) }
            onClick={ () => addWebsite({
              personSlug,
              origin,
              title,
            }) }>
            <PlusIcon className="size-6"/>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
