import UserIcon from '@heroicons/react/24/outline/UserIcon';

export interface RaceCandidateListProps {
  candidates: {
    person_id: string,
    first_name: string;
    last_name: string;
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
          </tr>
          </thead>
          <tbody>
          {
            candidates.map(({ person_id, first_name, last_name }) =>
              <tr key={ person_id }>
                <td>
                  { first_name }
                  { last_name }
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
