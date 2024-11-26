import { TableRow } from '@/types/database';
import { ScaleIcon } from '@heroicons/react/24/outline';

export default function IssuesList({ issues }: {
  issues: TableRow<'issues'>[]
}) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title text-2xl">
          <ScaleIcon className="size-6"/>
          Issues
        </h2>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
          </tr>
          </thead>
          <tbody>
          {
            issues.map(({ slug, title }) => <tr key={slug}>
              <td>{title}</td>
              <td>{slug}</td>
            </tr>)
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
