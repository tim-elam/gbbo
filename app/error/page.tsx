import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="h-full flex flex-col justify-around items-center">
      <div className="flex flex-col gap-4">
        <p>Sorry, something went wrong.</p>
        <Link className="btn btn-link font-bold text-lg" href="/">Home</Link>
      </div>
    </div>
  );
}
