import GlobeAltIcon from '@heroicons/react/24/outline/GlobeAltIcon';
import Link from 'next/link';

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
        <table className="table table-bordered table-zebra">
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
                <td>
                  <Link href={ `/admin/websites/${ slug }` }
                        className="btn btn-sm btn-link">
                    { title }
                  </Link>
                </td>
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
