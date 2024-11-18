import { db } from '@/utils/data/kysely';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const series = await db.selectFrom('series')
    .orderBy('series_number')
    .selectAll()
    .execute();
  const bakers = await db.selectFrom('bakers')
    .orderBy('name')
    .selectAll()
    .execute();
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-display text-5xl">Welcome to the G.B.B.O. Fan Site!</h1>
      <div className="w-96 flex flex-col items-stretch gap-4">
        <div className="card bg-base-100 shadow-md">
          <div id="series" className="card-body">
            <h1 className="card-title text-3xl">Series</h1>
            <ul className="list-disc">
              { series.map(entry => (
                <li key={ entry.series_number }>
                  <Link className="btn btn-lg btn-link" href="#">
                    { entry.series_number }
                  </Link>
                </li>
              ))
              }
            </ul>
          </div>
        </div>
        <div id="bakers" className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h1 className="card-title text-3xl">Bakers</h1>
            <ul className="list-disc">
              {
                bakers.map(baker => (
                  <li key={ `${ baker.series_number }:${ baker.name }` }
                      className="flex flex-col items-start">
                    <Link className="btn-lg btn btn-link" href="#">
                      { baker.name }
                    </Link>
                    <dl className="self-center flex gap-2">
                      <dt className="text-gray-600">Series:</dt>
                      <dd>{ baker.series_number }</dd>
                    </dl>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
