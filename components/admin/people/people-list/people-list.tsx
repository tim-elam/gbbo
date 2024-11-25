import { TableRow } from '@/types/database';
import { UserIcon } from '@heroicons/react/24/outline';

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
            <th>First</th>
            <th>Last</th>
            <th>Slug</th>
          </tr>
          </thead>
          <tbody>
          {
            people.map(({ slug, first_name, last_name }) => <tr key={slug}>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{slug}</td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
