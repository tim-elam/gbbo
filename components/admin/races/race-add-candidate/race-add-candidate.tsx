'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/20/solid';
import { addRaceCandidate } from './actions';
import { useState } from 'react';

export interface RaceAddCandidateProps {
  raceId: string;
  raceSlug: string;
  nonCandidates: {
    id: string;
    first_name: string;
    last_name: string;
  }[];
}

export default function RaceAddCandidate({ raceId, raceSlug, nonCandidates }: RaceAddCandidateProps) {
  const [personId, setPersonId] = useState<string>('');

  const handleCandidateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPersonId(event.target.value);
  };
  return (
    <form>
      <div className="card bg-base-100 shadow-md w-96 mx-auto">
        <div className="card-body">
          <h2 className="card-title">
            <UserIcon className="size-6"/>
            Add Candidate
          </h2>
          <select
            className="select select-bordered"
            value={ personId }
            onChange={ handleCandidateChange }>
            <option value="" disabled>
              Select a person
            </option>
            {
              nonCandidates.map(({ id, first_name, last_name }) => (
                <option key={ id }
                        value={id}>
                  { first_name } { last_name }
                </option>
              ))
            }
          </select>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary flex items-center gap-2"
              formAction={ () => addRaceCandidate({ raceSlug, raceId, personId }) }>
              <PlusIcon className="size-6"/>
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
