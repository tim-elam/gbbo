import { TableRow } from '@/types/database';
import { FilmIcon } from '@heroicons/react/24/outline';

export default async function SeriesList({ series }: {
  series: TableRow<'series'>[];
}) {
  return series?.map(entry =>
    <div className="card bg-base-100" key={ entry.series_number }>
      <div className="card-body">
        <h1 className="card-title flex items-center gap-2">
          <FilmIcon className="size-6"/>
          <span>Series { entry.series_number }</span>
        </h1>
      </div>
    </div>,
  );
}
