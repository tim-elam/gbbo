'use client';

import { ScaleIcon } from '@heroicons/react/24/outline';
import SparklesIcon from '@heroicons/react/24/solid/SparklesIcon';
import { useState } from 'react';
import { computeEmbedding } from '@/components/admin/issues/issues-list/actions';
import { clsx } from 'clsx';

interface IssuesListProps {
  issues: {
    slug: string;
    title: string;
  }[];
}

export default function IssuesList({ issues }: IssuesListProps) {
  const [embeddingTitle, setEmbeddingTitle] = useState('');

  async function handleEmbeddingClick(title: string) {
    if (embeddingTitle) {
      return;
    }
    setEmbeddingTitle(title);
    await computeEmbedding(title);
    setEmbeddingTitle('');
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title text-2xl">
          <ScaleIcon className="size-6"/>
          Issues
        </h2>
        <table className="table table-bordered table-zebra">
          <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            issues.map(({ slug, title }) => <tr key={ slug }>
              <td>{ title }</td>
              <td>{ slug }</td>
              <td>
                <button
                  className={ clsx('btn btn-primary btn-outline btn-sm btn-square', {
                    'animate-pulse': embeddingTitle === title,
                  }) }
                  onClick={ () => handleEmbeddingClick(title) }>
                  <SparklesIcon className="size-6"/>
                </button>
              </td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
