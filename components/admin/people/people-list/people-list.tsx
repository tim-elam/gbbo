import { TableRow } from '@/types/database';
import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PeopleList({ people }: {
  people: TableRow<'people'>[]
}) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <UserIcon className="size-6"/>
          People
        </h2>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {
            people.map(({ slug, first_name, last_name }) => <tr key={ slug }>
              <td>
                <Link
                  href={ `/admin/people/${ slug }` }
                  className="btn btn-link btn-primary">
                  { first_name } { last_name }
                </Link>
              </td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
