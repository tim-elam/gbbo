import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface WebsiteWebPageListProps {
  websiteSlug: string;
  webPages: {
    pathname: string;
    content: string;
    id: string;
  }[];
}

export default function WebsiteWebPageList({ websiteSlug, webPages }: WebsiteWebPageListProps) {
  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">
          <DocumentTextIcon className="size-6"/>
          Web Pages
        </h2>
        <table className="table table-bordered table-zebra">
          <thead>
          <tr>
            <th>Pathname</th>
            <th>Content</th>
          </tr>
          </thead>
          <tbody>
          {
            webPages.map(({ pathname, content, id }) => (
              <tr key={ pathname }>
                <td>
                  <Link
                    className='btn btn-link btn-sm'
                    href={`/admin/websites/${websiteSlug}/web-pages/${id}`}>
                    { pathname }
                  </Link>
                </td>
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
