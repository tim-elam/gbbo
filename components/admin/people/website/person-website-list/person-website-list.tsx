import GlobeAltIcon from '@heroicons/react/24/outline/GlobeAltIcon';

interface PersonWebsitesListProps {
  websites: {
    origin: string;
    title: string;
    slug: string;
  }[];
}

export default async function PersonWebsitesList({ websites }: PersonWebsitesListProps) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <GlobeAltIcon className="size-6"/>
          Websites
        </h2>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Title</th>
            <th>Origin</th>
          </tr>
          </thead>
          <tbody>
          {
            websites.map(({ title, origin, slug }) => (
              <tr key={ slug }>
                <td>{ title }</td>
                <td>{ origin }</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
