'use client';

import { FlagIcon } from '@heroicons/react/24/outline';
import { addRace } from './actions';
import { PlusIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import { useFormStatus } from 'react-dom';

export default function AddRace() {
  const { pending } = useFormStatus();
  return (
    <form>
      <div className="card bg-base-100 shadow-md w-96 mx-auto">
        <div className="card-body">
          <h2 className="card-title flex gap-2 items-center">
            <FlagIcon className="size-6"/>
            Add Race
          </h2>
          <label className="my-4 input input-bordered flex items-center gap-2">
            Title:
            <input className="grow"
                   type="text"
                   placeholder="City Council Member..."
                   name="title"
                   required/>
          </label>
          <label className="my-4 input input-bordered flex items-center gap-2">
            Date:
            <input className="grow"
                   type="date"
                   name="date"
                   required/>
          </label>
          <div className="card-actions justify-end">
            <button
              className={ clsx('btn btn-primary', { 'animate-pulse': pending }) }
              aria-disabled={ pending }
              formAction={ addRace }
              type="submit">
              <PlusIcon className="size-6"/>
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
