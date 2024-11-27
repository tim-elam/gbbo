'use client';

import GlobeAltIcon from '@heroicons/react/24/outline/GlobeAltIcon';
import { PlusIcon } from '@heroicons/react/20/solid';
import { addWebsite } from './actions';
import React, { ChangeEvent, useState } from 'react';
import { clsx } from 'clsx';
import { useFormStatus } from 'react-dom';

interface AddWebsiteProps {
  people: {
    slug: string;
    id: string;
    firstName: string;
    lastName: string;
  }[];
}

export default function AddWebsite({ people }: AddWebsiteProps) {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState('');
  const [origin, setOrigin] = useState('');
  const [person, setPerson] = useState<AddWebsiteProps['people'][number] | null>(null);

  function handleOriginChange(event: ChangeEvent<HTMLInputElement>) {
    setOrigin(event.target.value);
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handlePersonChange(event: ChangeEvent<HTMLSelectElement>) {
    setPerson(people[+event.target.value]);
  }

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-screen-md shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <GlobeAltIcon className="size-6"/>
          Add Website
        </h2>
        <div className="my-4 flex flex-col gap-2">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Person</span>
            </div>
            <select
              className="select select-bordered"
              onChange={ handlePersonChange }>
              <option value="" disabled>
                Select a person
              </option>
              {
                people.map(({ id, firstName, lastName }, index) => (
                  <option key={ id }
                          value={ index }>
                    { firstName } { lastName }
                  </option>
                ))
              }
            </select>
          </label>
          <label className="w-full form-control flex gap-2">
            <div className="label">
              <span className="label-text">
                Title
              </span>
            </div>
            <input className="input input-bordered w-full"
                   type="text"
                   placeholder="Candidate Site"
                   value={ title }
                   onChange={ handleTitleChange }
                   required/>
          </label>
          <label className="w-full form-control flex gap-2">
            <div className="label">
              <span className="label-text">
              Origin
              </span>
            </div>
            <input className="input input-bordered w-full"
                   type="text"
                   placeholder="https://www.example.com"
                   value={ origin }
                   onChange={ handleOriginChange }
                   required/>
          </label>
        </div>
        <div className="card-actions self-end">
          <button
            className={ clsx('btn btn-primary', { 'animate-pulse': pending }) }
            onClick={ () => addWebsite({
              person,
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
