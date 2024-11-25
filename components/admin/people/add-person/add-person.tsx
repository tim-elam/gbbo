'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import { addPerson } from './actions';
import { PlusIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import { useFormStatus } from 'react-dom';

export default function AddPerson() {
  const { pending } = useFormStatus();
  return (
    <form>
      <div className="card bg-base-100 shadow-md w-96 mx-auto">
        <div className="card-body">
          <h2 className="card-title flex gap-2 items-center">
            <UserIcon className="size-6"/>
            Add Person
          </h2>
          <label className="my-4 input input-bordered flex items-center gap-2">
            First Name:
            <input className="grow"
                   type="text"
                   placeholder="Jane"
                   name="first_name"
                   required/>
          </label>
          <label className="my-4 input input-bordered flex items-center gap-2">
            Last Name:
            <input className="grow"
                   type="text"
                   placeholder="Doe"
                   name="last_name"
                   required/>
          </label>
          <div className="card-actions justify-end">
            <button
              className={ clsx('btn btn-primary', { 'animate-pulse': pending }) }
              aria-disabled={ pending }
              formAction={ addPerson }
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
