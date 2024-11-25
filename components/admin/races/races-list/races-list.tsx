import { TableRow } from '@/types/database';
import { FlagIcon } from '@heroicons/react/24/outline';

export default function RacesList({ races }: {
  races: TableRow<'races'>[]
}) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <FlagIcon className="size-6"/>
          Races
        </h2>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {
            races.map(({ slug, title, date }) => <tr key={slug}>
              <td>{title}</td>
              <td>{slug}</td>
              <td>{(date as unknown as Date).toLocaleDateString()}</td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
