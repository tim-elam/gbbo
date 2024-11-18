import { TableRow } from '@/types/database';
import { FilmIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

export default async function SeriesList({ series }: {
  series: Map<number, TableRow<'bakers'>[]>;
}) {
  const entries = series ? [...series.entries()] : null;
  return entries
    ?.sort((a, b) => a[0] - b[0])
    ?.map(([seriesNumber, bakers]) => {
        return <div className="card bg-base-100" key={ seriesNumber }>
          <div className="card-body">
            <h1 className="card-title flex items-center gap-2">
              <FilmIcon className="size-6"/>
              <span>Series { seriesNumber }</span>
            </h1>
            <p>
              {
                bakers.sort((a, b) => a.name.localeCompare(b.name))
                  .map(
                    (baker) => <span className="btn btn-link" key={ baker.name }>
                    { baker.name }
                  </span>,
                  )
              }
            </p>
          </div>
        </div>;
      },
    );
}
