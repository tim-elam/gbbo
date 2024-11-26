import UserIcon from '@heroicons/react/24/outline/UserIcon';
import Link from 'next/link';

export interface RaceCandidateListProps {
  candidates: {
    person_id: string,
    first_name: string;
    last_name: string;
    slug: string;
  }[];
}

export default function RaceCandidateList({ candidates }: RaceCandidateListProps) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="card-title">
          <UserIcon className="size-6"/>
          Candidates
        </div>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {
            candidates.map(({ person_id, slug, first_name, last_name }) =>
              <tr key={ person_id }>
                <td>
                  <Link
                    href={ `/admin/people/${ slug }` }
                    className="btn btn-primary btn-link">
                    { first_name } { last_name }
                  </Link>
                </td>
              </tr>,
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
