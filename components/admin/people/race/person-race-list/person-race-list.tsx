import FlagIcon from '@heroicons/react/24/outline/FlagIcon';
import Link from 'next/link';

interface PersonRacesListProps {
  races: {
    slug: string;
    title: string;
    id: string;
    date: string;
  }[];
}

export default async function PersonRacesList({ races }: PersonRacesListProps) {
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
            <th>Race</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {
            races.map(({ title, id, slug, date }) => (
              <tr key={ id }>
                <td>
                  <Link
                    href={ `/admin/races/${ slug }` }
                    className="btn btn-primary btn-link">
                    { title }
                  </Link>
                </td>
                <td>{ (date as unknown as Date)?.toDateString() }</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
