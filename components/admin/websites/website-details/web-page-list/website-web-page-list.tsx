import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface WebsiteWebPageListProps {
  webPages: {
    pathname: string;
    content: string;
  }[];
}

export default function WebsiteWebPageList({ webPages }: WebsiteWebPageListProps) {
  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">
          <DocumentTextIcon className="size-6"/>
          Web Pages
        </h2>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Pathname</th>
            <th>Content</th>
          </tr>
          </thead>
          <tbody>
          {
            webPages.map(({ pathname, content }) => (
              <tr key={ pathname }>
                <td>{ pathname }</td>
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
