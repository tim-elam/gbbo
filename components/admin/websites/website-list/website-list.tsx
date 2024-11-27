import GlobeAltIcon from '@heroicons/react/24/outline/GlobeAltIcon';
import Link from 'next/link';

interface WebsitesListProps {
  websites: {
    origin: string;
    title: string;
    slug: string;
    personFirstName: string;
    personLastName: string;
    personSlug: string;
  }[];
}

export default async function WebsitesList({ websites }: WebsitesListProps) {
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
            <th>Person</th>
          </tr>
          </thead>
          <tbody>
          {
            websites.map(({ title, origin, slug, personSlug, personLastName, personFirstName }) => (
              <tr key={ slug }>
                <td>
                  <Link
                    href={ `/admin/websites/${ slug }` }
                    className="btn btn-link">
                    { title }
                  </Link>
                </td>
                <td>{ origin }</td>
                <td>
                  <Link
                    href={ `/admin/people/${ personSlug }` }
                    className="btn btn-link">
                    { personFirstName } { personLastName }
                  </Link>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
