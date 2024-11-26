import { ScaleIcon } from '@heroicons/react/24/outline';
import { LightBulbIcon } from '@heroicons/react/20/solid';

interface PersonPositionsListProps {
  positions: {
    content: string;
    issueTitle: string;
    issueId: string;
    id: string;
  }[];
  issues: {
    title: string;
    id: string;
  }[];
}

export default async function PersonPositionsList({ positions, issues }: PersonPositionsListProps) {
  const issuePositions: Record<string, PersonPositionsListProps['positions']> = {};
  positions.forEach(position => {
    issuePositions[position.issueId] ||= [];
    issuePositions[position.issueId].push(position);
  });

  return (
    <div className="flex flex-col gap-8">
      {
        issues.map(({ title, id }) => (
          <div key={ id }>
            <h2 className="text-xl flex gap-2 items-center">
              <ScaleIcon className="size-6"/>
              { title }
            </h2>
            <div className="mt-2 flex flex-col gap-4">
              {
                issuePositions[id]?.map(({ id, content }) => (
                  <div
                    key={ id }
                    className="card bg-base-100 shadow-md">
                    <div className="card-body">
                      <h2 className="card-title flex gap-1 items-center">
                        <LightBulbIcon className='size-4' />
                        Position
                      </h2>
                      { content }
                    </div>
                  </div>
                )) ?? <div className="mx-8">No positions yet.</div>
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}
