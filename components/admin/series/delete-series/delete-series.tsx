'use client';

import React from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import { deleteSeries } from '@/components/admin/series/delete-series/actions';

interface DeleteSeriesProps {
  seriesNumber: number;
}

export default function DeleteSeries({ seriesNumber }: DeleteSeriesProps) {
  return (
    <button
      className="btn btn-error btn-outline flx items-center gap-2"
      onClick={ () => deleteSeries(seriesNumber) }>
      <TrashIcon className="size-6"/>
      Delete
    </button>
  );
}
