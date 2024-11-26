'use client';

import FlagIcon from '@heroicons/react/24/outline/FlagIcon';
import { PlusIcon } from '@heroicons/react/20/solid';
import { enterRace } from './actions';
import React, { useState } from 'react';
import { clsx } from 'clsx';
import { useFormStatus } from 'react-dom';

interface PersonEnterRaceProps {
  personSlug: string;
  races: {
    id: string;
    title: string;
    slug: string;
  }[];
}

export default function PersonEnterRace({ races, personSlug }: PersonEnterRaceProps) {
  const [race, setRace] = useState<PersonEnterRaceProps['races'][number] | null>(null);
  const { pending } = useFormStatus();
  function handleIssueChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const race = races[+event.target.value];
    setRace(race);
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <FlagIcon className="size-6"/>
          Enter Race
        </h2>
        <div className="my-4 flex flex-col gap-2">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Race</span>
            </div>
            <select
              className="select select-bordered"
              required={true}
              onChange={ handleIssueChange }>
              <option value="" disabled>
                Select an Race...
              </option>
              {
                races.map(({ id, title }, index) => (
                  <option key={ id } value={ index }>
                    { title }
                  </option>
                ))
              }
            </select>
          </label>
        </div>
        <div className="card-actions self-end">
          <button
            className={ clsx('btn btn-primary', { 'animate-pulse': pending }) }
            onClick={ () => enterRace({
              personSlug,
              race,
            }) }>
            <PlusIcon className="size-6"/>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
