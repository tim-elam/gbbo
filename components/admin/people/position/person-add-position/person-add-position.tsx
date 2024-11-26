'use client';

import LightBulbIcon from '@heroicons/react/24/outline/LightBulbIcon';
import { PlusIcon } from '@heroicons/react/20/solid';
import { addPosition } from './actions';
import React, { useState } from 'react';
import { clsx } from 'clsx';
import { useFormStatus } from 'react-dom';

interface PersonAddPositionProps {
  personSlug: string;
  issues: {
    id: string;
    title: string;
  }[];
}

export default function PersonAddPosition({ issues, personSlug }: PersonAddPositionProps) {
  const [issueId, setIssueId] = useState(issues[0].id || '');
  const [content, setContent] = useState('');

  const { pending } = useFormStatus();

  function handleIssueChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setIssueId(event.target.value);
  }
  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <LightBulbIcon className="size-6"/>
          Add Position
        </h2>
        <div className="my-4 flex flex-col gap-2">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Issue</span>
            </div>
            <select
              className="select select-bordered"
              required={true}
              onChange={ handleIssueChange }>
              <option value="" disabled>
                Select an Issue...
              </option>
              {
                issues.map(({ id, title }) => (
                  <option key={ id } value={ id }>
                    { title }
                  </option>
                ))
              }
            </select>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Content</span>
            </div>
            <textarea
              className="textarea"
              placeholder="Their position on this issue."
              value={content}
              onChange={handleContentChange}
              required={true}
            />
          </label>
        </div>
        <div className="card-actions self-end">
          <button
            className={ clsx('btn btn-primary', { 'animate-pulse': pending }) }
            onClick={ () => addPosition({
              personSlug,
              issueId,
              content,
            }) }>
            <PlusIcon className="size-6"/>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
