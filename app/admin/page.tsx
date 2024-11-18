import Link from 'next/link';

export default function Admin() {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h1 className="card-title">Management Actions</h1>
        <div className="flex flex-col items-start">
          <Link className="btn-lg btn btn-link" href="/admin/series">Series</Link>
        </div>
      </div>
    </div>
  );
}
