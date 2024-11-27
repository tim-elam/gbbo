import { TableRow } from '@/types/database';
import Link from 'next/link';
import { FlagIcon, GlobeAltIcon, LightBulbIcon, UserIcon } from '@heroicons/react/24/outline';

export default function PeopleList({ people }: {
  people: TableRow<'people'>[]
}) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title text-2xl">
          <UserIcon className="size-6"/>
          People
        </h2>
        <table className="table table-bordered table-zebra">
          <thead>
          <tr>
            <th>Name</th>
            <th>Links</th>
          </tr>
          </thead>
          <tbody>
          {
            people.map(({ slug, first_name, last_name }) => {
              const href = `/admin/people/${ slug }`;
              return <tr key={ slug }>
                <td>
                  <Link
                    href={ href }
                    className="btn btn-sm btn-link btn-primary">
                    { first_name } { last_name }
                  </Link>
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={ `${ href }/positions` }
                      className="btn btn-primary btn-sm btn-outline btn-square">
                      <LightBulbIcon className="size-6"/>
                    </Link>
                    <Link
                      href={ `${ href }/races` }
                      className="btn btn-primary btn-sm btn-outline btn-square">
                      <FlagIcon className="size-6"/>
                    </Link>
                    <Link
                      href={ `${ href }/websites` }
                      className="btn btn-primary btn-sm btn-outline btn-square">
                      <GlobeAltIcon className="size-6"/>
                    </Link>
                  </div>
                </td>
              </tr>;
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
