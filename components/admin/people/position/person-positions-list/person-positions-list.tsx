import LightBulbIcon from '@heroicons/react/24/outline/LightBulbIcon';

interface PersonPositionsListProps {
  positions: {
    content: string;
    issueTitle: string;
    issueId: string;
    id: string;
  }[];
}

export default async function PersonPositionsList({ positions }: PersonPositionsListProps) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <LightBulbIcon className="size-6"/>
          Positions
        </h2>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Issue</th>
            <th>Content</th>
          </tr>
          </thead>
          <tbody>
          {
            positions.map(({ content, issueTitle, id }) => (
              <tr key={ id }>
                <td>{ issueTitle }</td>
                <td>{ content }</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
